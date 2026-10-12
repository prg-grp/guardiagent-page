import type { DemoResult, demoModels, demoTasks } from '@/lib/agentspy-demo';

// Widened, read-only view of one recorded result. The generated data is `as const`, so every model x task pair has
// its own literal type; helpers work on this structural type instead. `asRecording` checks assignability at compile
// time and returns the same object.

export type ResourceKind = 'commands' | 'hosts' | 'files';
export const resourceKinds: readonly ResourceKind[] = ['commands', 'hosts', 'files'];

export type ResourceRow = { readonly name: string; readonly counts: readonly number[]; readonly differs: boolean };

export type ResourceBlock = {
  readonly rows: readonly ResourceRow[];
  readonly other: { readonly distinct: number; readonly counts: readonly number[] } | null;
  readonly distinct: readonly number[];
  readonly total: readonly number[];
};

export type Similarity = { readonly pairs: readonly number[]; readonly mean: number };

export type RunRecord = {
  readonly tests: readonly number[];
  readonly seconds: number;
  readonly skillFiles: readonly number[];
  readonly inputFiles: readonly number[];
  readonly toolCalls: number;
};

export type Recording = {
  readonly runs: readonly RunRecord[];
  readonly resources: { readonly [K in ResourceKind]: ResourceBlock };
  readonly similarity: { readonly [K in ResourceKind | 'overall']: Similarity };
};

export type DemoModel = (typeof demoModels)[number];
export type DemoTask = (typeof demoTasks)[number];

export function asRecording(result: DemoResult): Recording {
  return result;
}

export const resourceLabels: Record<ResourceKind, string> = {
  commands: 'Commands',
  hosts: 'Hosts',
  files: 'Files',
};

// Order of `similarity.*.pairs` in the data: R1-R2, R1-R3, R2-R3.
export const runPairs: readonly (readonly [number, number])[] = [
  [1, 2],
  [1, 3],
  [2, 3],
];

export type RunMetrics = {
  run: number;
  testsPassed: number;
  testsTotal: number;
  seconds: number;
  skillUsed: number;
  skillTotal: number;
  // Agent's own record: tool calls in the codex trajectory.
  toolCalls: number;
  // System record: executions of commands (sum of command counts), connections to hosts (sum of host counts; the
  // hosts resource type leaves out the model provider, §4.1) and distinct file accesses (distinct reads:/writes:
  // resources).
  commands: number;
  connections: number;
  fileAccesses: number;
};

export function runMetrics(rec: Recording): RunMetrics[] {
  return rec.runs.map((r, i) => ({
    run: i + 1,
    testsPassed: r.tests[0],
    testsTotal: r.tests[1],
    seconds: r.seconds,
    skillUsed: r.skillFiles[0],
    skillTotal: r.skillFiles[1],
    toolCalls: r.toolCalls,
    commands: rec.resources.commands.total[i],
    connections: rec.resources.hosts.total[i],
    fileAccesses: rec.resources.files.distinct[i],
  }));
}

// True when some run contacted a host. The hosts resource type does not include the model provider (§4.1), so
// "no host" means no host other than the model provider, not "no network traffic".
export function hasNetworkActivity(rec: Recording): boolean {
  return rec.resources.hosts.total.some((n) => n > 0);
}

// Similarity values are stored with four decimals; round half up on the integer ten-thousandths so the two-decimal
// figures match the paper's tables.
export function formatSimilarity(v: number): string {
  const tenThousandths = Math.round(v * 10000);
  return (Math.floor((tenThousandths + 50) / 100) / 100).toFixed(2);
}

export function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

// "1 tool call", "16 tool calls".
export function countOf(n: number, singular: string, pluralForm = `${singular}s`): string {
  return `${formatCount(n)} ${n === 1 ? singular : pluralForm}`;
}

export function listAnd(items: readonly string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export function allEqual(values: readonly number[]): boolean {
  return values.every((v) => v === values[0]);
}

// Sequential violet ramp for similarity cells (one hue, light to dark). Text switches to white on the two dark steps;
// every step clears 4.5:1 with its text color.
const heatSteps = [
  { from: 0, bg: '#ede9fe', fg: '#1e293b' },
  { from: 0.2, bg: '#ddd6fe', fg: '#1e293b' },
  { from: 0.4, bg: '#a78bfa', fg: '#1e293b' },
  { from: 0.6, bg: '#7c3aed', fg: '#ffffff' },
  { from: 0.8, bg: '#5b21b6', fg: '#ffffff' },
] as const;

export const heatLegend = heatSteps.map((s) => ({ from: s.from, bg: s.bg }));

export function heatColor(v: number): { bg: string; fg: string } {
  let step: (typeof heatSteps)[number] = heatSteps[0];
  for (const s of heatSteps) if (v >= s.from) step = s;
  return { bg: step.bg, fg: step.fg };
}
