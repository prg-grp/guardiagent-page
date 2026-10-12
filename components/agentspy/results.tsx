import { ConfusionMatrix } from '@/components/agentspy/confusion-matrix';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import type React from 'react';

// Evaluation of the AgentSpy paper (§4): RQ1 to RQ4. Every number below is from §4.1-4.4, Fig. 5 and Table 3.

type Rq2Row = { label: string; values: [number, number, number, number]; pct?: string; sub?: boolean; head?: boolean };

const rq2: Rq2Row[] = [
  { label: 'Tasks with three passing runs', values: [21, 27, 40, 88], head: true },
  { label: 'Q1: activity unrelated to the task', values: [3, 11, 2, 16], pct: '18.2%' },
  { label: 'Environment exploration', values: [1, 4, 0, 5], sub: true },
  { label: 'Unrequested network access', values: [2, 4, 2, 8], sub: true },
  { label: 'Test file access', values: [0, 6, 0, 6], sub: true },
  { label: 'Q2: result reached without the skill guidance', values: [7, 5, 3, 15], pct: '17.0%' },
  { label: 'Oracle reuse', values: [0, 2, 0, 2], sub: true },
  { label: 'Skill files ignored', values: [7, 4, 3, 14], sub: true },
];

const rq2Models = [
  { short: 'glm', mobile: 'glm', full: 'glm-5.3-flash' },
  { short: 'deepseek', mobile: 'ds', full: 'deepseek-v4-flash' },
  { short: 'gpt', mobile: 'gpt', full: 'gpt-5.6-terra' },
];

function Rq2Table() {
  return (
    <details className="group rounded-xl border bg-background">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
        Findings by model (Table 3)
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="overflow-x-auto border-t">
        <table className="w-full text-xs sm:text-sm">
          <caption className="sr-only">
            RQ2: manual inspection of the task and model pairs whose three runs all pass, by model
          </caption>
          <thead>
            <tr className="border-b bg-muted/50 text-foreground">
              <th scope="col" className="px-2.5 py-2 text-left font-semibold sm:px-3">
                <span className="sr-only">Label</span>
              </th>
              {rq2Models.map((m) => (
                <th
                  key={m.short}
                  scope="col"
                  className="px-1.5 py-2 text-right font-mono text-xs font-semibold sm:px-2"
                  title={m.full}
                >
                  <abbr title={m.full} className="no-underline sm:hidden">
                    {m.mobile}
                  </abbr>
                  <span className="hidden sm:inline">{m.short}</span>
                </th>
              ))}
              <th scope="col" className="px-2.5 py-2 text-right font-semibold sm:px-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {rq2.map((r) => (
              <tr
                key={r.label}
                className={cn(
                  !r.sub && 'border-t',
                  (r.head || r.pct) && 'font-semibold text-foreground',
                  r.head && 'bg-muted/20'
                )}
              >
                <th
                  scope="row"
                  className={cn(
                    'px-2.5 py-1.5 text-left align-top sm:px-3',
                    r.sub ? 'pl-5 font-normal sm:pl-7' : 'font-semibold'
                  )}
                >
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td
                    key={i}
                    className={cn(
                      'px-1.5 py-1.5 text-right align-top tabular-nums sm:px-2',
                      i === 3 && 'px-2.5 whitespace-nowrap sm:px-3'
                    )}
                  >
                    {v}
                    {i === 3 && r.pct && (
                      <span className="block text-[11px] font-normal text-muted-foreground sm:ml-1.5 sm:inline sm:text-sm">
                        ({r.pct})
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          glm is glm-5.3-flash, deepseek (ds) is deepseek-v4-flash and gpt is gpt-5.6-terra. Clusters are not exclusive.
          Test file access means reading the benchmark&apos;s grading tests; oracle reuse means running its scripted
          solution.
        </p>
      </div>
    </details>
  );
}

function Finding({ title, rq, children }: { title: string; rq: string; children: React.ReactNode }) {
  return (
    <div className="border-t pt-4">
      <h3 className="mb-1.5 flex flex-wrap items-baseline gap-x-2 font-semibold">
        {title}
        <span className="font-mono text-xs font-normal text-muted-foreground">{rq}</span>
      </h3>
      <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export function AgentSpyResults() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div className="min-w-0 space-y-8">
        <Finding title="Reliability" rq="RQ1 · §4.1">
          <p>
            The three runs of a task are more alike than sets that mix in runs of a dissimilar task in 92.2% of
            comparisons across the three models. On gpt-5.6-terra, same-task sets average 0.60 and mixed sets 0.30.
          </p>
        </Finding>
        <Finding title="Passing runs compared with tests" rq="RQ2 · §4.2">
          <p>
            Two authors read the reports of the 88 task-model pairs whose three runs all passed every test. They found
            activity unrelated to the task in 16 pairs (18%) and results reached without the skill&apos;s guidance in
            15 (17%).
          </p>
          <Rq2Table />
        </Finding>
        <Finding title="Overhead" rq="RQ4 · §4.4">
          <p>
            In 12 comparisons of ten runs with and ten without monitoring, no runtime difference was significant (p ≥
            0.16). Effect sizes were small or medium, never large.
          </p>
        </Finding>
      </div>

      <article className="min-w-0 rounded-2xl border bg-card p-4 sm:p-6">
        <h3 className="mb-1.5 flex flex-wrap items-baseline gap-x-2 font-semibold">
          Security
          <span className="font-mono text-xs font-normal text-muted-foreground">RQ3 · §4.3</span>
        </h3>
        <p className="mb-5 text-[15px] leading-relaxed text-muted-foreground">
          One script-injection case from each applicable Skill-Inject category (S1 exfiltration, S2 destruction, S3
          denial of service, S4 malware, S5 backdoor) ran five times with the injection and five times without it.
        </p>
        <ConfusionMatrix />
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
          All four misses are the S5 backdoor. Its script adds a Git remote that the agent never pushes to, so the
          change stays in the workspace and matches no rule.
        </p>
      </article>
    </div>
  );
}
