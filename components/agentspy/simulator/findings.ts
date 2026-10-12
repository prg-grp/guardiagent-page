import type { DemoResult } from '@/lib/agentspy-demo';
import {
  allEqual,
  asRecording,
  countOf,
  formatCount,
  formatSimilarity,
  hasNetworkActivity,
  listAnd,
  resourceKinds,
  runMetrics,
  runPairs,
  type DemoTask,
  type Recording,
  type ResourceKind,
  type ResourceRow,
} from '@/components/agentspy/simulator/model';

// Deterministic findings for one recorded model x task result. Every sentence states counts or scores from the data
// (or sums of them). No thresholds, no judgments, no security claims: these runs come from the reliability study.

// A finding is a list of segments; `code` segments name a resource and render in monospace.
export type FindingSegment = string | { code: string };
export type Finding = { id: string; segments: FindingSegment[] };

const kindNouns: Record<ResourceKind, string> = { commands: 'commands', hosts: 'hosts', files: 'files' };

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function times(n: number): string {
  if (n === 1) return 'once';
  if (n === 2) return 'twice';
  return `${formatCount(n)} times`;
}

// Interleave code segments with ", " and " and " separators.
function codeList(names: readonly string[]): FindingSegment[] {
  const out: FindingSegment[] = [];
  names.forEach((name, i) => {
    if (i > 0) out.push(i === names.length - 1 ? ' and ' : ', ');
    out.push({ code: name });
  });
  return out;
}

// Rows used by exactly one run, grouped by run (sorted by that run's count, then as recorded).
function uniqueToOneRun(rows: readonly ResourceRow[], runs: number): { run: number; rows: ResourceRow[] }[] {
  const byRun: ResourceRow[][] = Array.from({ length: runs }, () => []);
  for (const row of rows) {
    const used = row.counts.flatMap((c, i) => (c > 0 ? [i] : []));
    if (used.length === 1) byRun[used[0]].push(row);
  }
  return byRun.flatMap((list, i) =>
    list.length > 0 ? [{ run: i + 1, rows: [...list].sort((x, y) => y.counts[i] - x.counts[i]) }] : []
  );
}

function testsFinding(rec: Recording): Finding {
  const m = runMetrics(rec);
  const total = m[0].testsTotal;
  const allPass = m.every((r) => r.testsPassed === r.testsTotal);
  const runs = m.length === 3 ? 'three' : String(m.length);
  if (allPass) {
    const all = total === 1 ? 'the single test' : total === 2 ? 'both tests' : `all ${total} tests`;
    return { id: 'tests', segments: [`All ${runs} runs pass ${all}.`] };
  }
  const passed = listAnd(m.map((r) => String(r.testsPassed)));
  return { id: 'tests', segments: [`The runs pass ${passed} of the ${countOf(total, 'test')}.`] };
}

function consistencyFinding(rec: Recording): Finding {
  // Host similarity is recorded as 1.00 when no run contacts a host; leave it out of the comparison in that case.
  const kinds = resourceKinds.filter((k) => k !== 'hosts' || hasNetworkActivity(rec));
  const sorted = [...kinds].sort((a, b) => rec.similarity[a].mean - rec.similarity[b].mean);
  const lo = sorted[0];
  const hi = sorted[sorted.length - 1];
  const loV = formatSimilarity(rec.similarity[lo].mean);
  const hiV = formatSimilarity(rec.similarity[hi].mean);

  let first: string;
  if (loV === hiV) {
    first = `${capitalize(listAnd(sorted.map((k) => kindNouns[k])))} have the same set similarity (${loV}).`;
  } else if (sorted.length === 2) {
    first = `${capitalize(kindNouns[lo])} differ more across runs than ${kindNouns[hi]} (set similarity ${loV} against ${hiV}).`;
  } else {
    first = `${capitalize(kindNouns[lo])} differ most across runs (set similarity ${loV}), ${kindNouns[hi]} least (${hiV}).`;
  }

  const pairs = rec.similarity.overall.pairs;
  let minIdx = 0;
  pairs.forEach((v, i) => {
    if (v < pairs[minIdx]) minIdx = i;
  });
  const [a, b] = runPairs[minIdx];
  const second = ` The least similar pair is Run ${a} and Run ${b} (${formatSimilarity(pairs[minIdx])} overall).`;
  return { id: 'consistency', segments: [first + second] };
}

// Hosts that only one run contacted; when there are none, command resources that appear in only one run. Command
// resources are named as recorded (`find` and `find:SKILL.md` are different resources), so the sentence refers to the
// listed rows of the command table instead of to programs.
function singleRunFinding(rec: Recording): Finding {
  const runs = rec.runs.length;
  const segments: FindingSegment[] = [];
  let listedHosts = false;

  if (!hasNetworkActivity(rec)) {
    segments.push('No run contacted a host other than the model provider.');
  } else {
    const parts = uniqueToOneRun(rec.resources.hosts.rows, runs);
    parts.forEach(({ run, rows }, idx) => {
      const names = rows.map((r) => r.name);
      segments.push(idx === 0 ? `Run ${run} alone contacted ` : `; Run ${run} alone contacted `);
      if (names.length <= 3) {
        segments.push(...codeList(names));
      } else {
        segments.push(`${names.length} hosts, including `, ...codeList(names.slice(0, 2)));
      }
    });
    if (parts.length > 0) {
      segments.push('.');
      listedHosts = true;
    } else {
      // Host rows can omit hosts folded into "other"; only claim what the listed rows show.
      const which = rec.resources.hosts.other ? 'Every listed host' : 'Every host';
      segments.push(`${which} was contacted by at least two runs.`);
    }
  }

  if (!listedHosts) {
    const parts = uniqueToOneRun(rec.resources.commands.rows, runs);
    if (parts.length === 0) {
      segments.push(' Every listed command appears in at least two runs.');
    } else {
      segments.push(' Of the listed commands, ');
      parts.forEach(({ run, rows }, idx) => {
        if (idx > 0) segments.push('; ');
        if (rows.length === 1) {
          const r = rows[0];
          segments.push({ code: r.name }, ` appears only in Run ${run} (${times(r.counts[run - 1])})`);
        } else if (rows.length <= 3) {
          segments.push(...codeList(rows.map((r) => r.name)), ` appear only in Run ${run}`);
        } else {
          segments.push(`${rows.length} appear only in Run ${run}, including `, ...codeList(rows.slice(0, 2).map((r) => r.name)));
        }
      });
      segments.push('.');
    }
  }

  return { id: 'single-run', segments };
}

function skillFinding(rec: Recording, task: DemoTask): Finding {
  const m = runMetrics(rec);
  const total = m[0].skillTotal;
  const used = m.map((r) => r.skillUsed);
  const names = task.skills.map((s) => s.name);
  const skillWord = names.length === 1 ? 'skill' : 'skills';
  const ofSkills: FindingSegment[] = [...codeList(names), ` ${skillWord}.`];
  const fileWord = total === 1 ? 'file' : 'files';

  if (allEqual(used)) {
    if (used[0] === 0) {
      return { id: 'skills', segments: [`No run used any of the ${countOf(total, 'file')} of the `, ...ofSkills] };
    }
    if (used[0] === total) {
      const all = total === 1 ? 'the single file' : total === 2 ? 'both files' : `all ${total} files`;
      return { id: 'skills', segments: [`Every run used ${all} of the `, ...ofSkills] };
    }
    return { id: 'skills', segments: [`Each run used ${used[0]} of the ${total} ${fileWord} of the `, ...ofSkills] };
  }
  return {
    id: 'skills',
    segments: [`The runs used ${listAnd(used.map(String))} of the ${total} ${fileWord} of the `, ...ofSkills],
  };
}

// The run with the largest difference between commands executed and tool calls (first run on a tie).
function trajectoryFinding(rec: Recording): Finding {
  const m = runMetrics(rec);
  let best = m[0];
  for (const r of m) if (r.commands - r.toolCalls > best.commands - best.toolCalls) best = r;
  const system = [countOf(best.commands, 'command')];
  if (best.connections > 0) system.push(countOf(best.connections, 'host connection'));
  system.push(countOf(best.fileAccesses, 'distinct file access', 'distinct file accesses'));
  return {
    id: 'trajectory',
    segments: [
      `Run ${best.run} has the largest gap between tool calls and commands executed: ` +
        `${countOf(best.toolCalls, 'tool call')} in the trajectory against ${listAnd(system)} in the system record.`,
    ],
  };
}

export function computeFindings(result: DemoResult, task: DemoTask): Finding[] {
  const rec = asRecording(result);
  return [
    testsFinding(rec),
    consistencyFinding(rec),
    singleRunFinding(rec),
    skillFinding(rec, task),
    trajectoryFinding(rec),
  ];
}

// Plain-text form, for tests and screen-reader summaries.
export function findingText(f: Finding): string {
  return f.segments.map((s) => (typeof s === 'string' ? s : s.code)).join('');
}
