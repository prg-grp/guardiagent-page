import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  formatCount,
  formatSimilarity,
  hasNetworkActivity,
  heatColor,
  heatLegend,
  resourceKinds,
  resourceLabels,
  runPairs,
  type Recording,
  type ResourceBlock,
  type ResourceKind,
  type RunMetrics,
} from '@/components/agentspy/simulator/model';
import { cn } from '@/lib/utils';
import { FileText, Globe, Sigma, Terminal } from 'lucide-react';
import type React from 'react';

export const resourceIcons: Record<ResourceKind, React.ElementType> = {
  commands: Terminal,
  hosts: Globe,
  files: FileText,
};

const runNumbers = [1, 2, 3] as const;

/* Trajectory vs. system record ---------------------------------------------------------------------------------- */

// Tool calls and commands share one scale (both count actions); host connections and file accesses have no
// counterpart in the trajectory, so they are printed as figures rather than drawn on that scale.
function BarRow({
  label,
  value,
  max,
  tone,
}: {
  label: string;
  value: number;
  max: number;
  tone: 'trajectory' | 'system';
}) {
  const width = max > 0 ? (value / max) * 82 : 0;
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 flex items-center gap-2 border-l border-slate-300 py-0.5">
        <span
          aria-hidden
          className={cn('h-2.5 shrink-0 rounded-r-[4px]', tone === 'trajectory' ? 'bg-slate-500' : 'bg-spy')}
          style={{ width: `${width}%`, minWidth: value > 0 ? 3 : 0 }}
        />
        <span className="text-sm font-semibold tabular-nums">{formatCount(value)}</span>
      </dd>
    </div>
  );
}

function Swatch({ className }: { className: string }) {
  return <span aria-hidden className={cn('inline-block h-2.5 w-4 shrink-0 rounded-r-[3px]', className)} />;
}

export function TrajectoryContrast({ metrics }: { metrics: RunMetrics[] }) {
  const max = Math.max(...metrics.flatMap((m) => [m.commands, m.toolCalls]));
  return (
    <div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <Swatch className="bg-slate-500" />
          Trajectory: tool calls the agent reports
        </li>
        <li className="flex items-center gap-2">
          <Swatch className="bg-spy" />
          System record: commands executed by the agent and its subprocesses
        </li>
      </ul>
      <div className="mt-4 grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.run} role="group" aria-label={`Run ${m.run}`} className="bg-background p-4">
            <p aria-hidden className="text-sm font-semibold">
              Run {m.run}
            </p>
            <dl className="mt-3 space-y-2.5">
              <BarRow label="Tool calls in the trajectory" value={m.toolCalls} max={max} tone="trajectory" />
              <BarRow label="Commands executed" value={m.commands} max={max} tone="system" />
            </dl>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t pt-3">
              <div>
                <dt className="text-xs text-muted-foreground">Host connections</dt>
                <dd className="mt-0.5 text-base font-semibold">
                  {m.connections > 0 ? formatCount(m.connections) : <span className="text-muted-foreground">none</span>}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Distinct file accesses</dt>
                <dd className="mt-0.5 text-base font-semibold">{formatCount(m.fileAccesses)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Connections to the model provider are not counted.</p>
    </div>
  );
}

/* Similarity by resource type ----------------------------------------------------------------------------------- */

function HeatCell({ value, muted }: { value: number; muted?: boolean }) {
  const text = formatSimilarity(value);
  if (muted) {
    return (
      <span className="flex h-9 items-center justify-center rounded-md border bg-muted/60 font-mono text-xs text-muted-foreground tabular-nums">
        {text}
      </span>
    );
  }
  const { bg, fg } = heatColor(value);
  return (
    <span
      className="flex h-9 items-center justify-center rounded-md font-mono text-xs font-medium tabular-nums"
      style={{ backgroundColor: bg, color: fg }}
    >
      {text}
    </span>
  );
}

export function HeatLegend() {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground" aria-hidden>
      <span className="font-mono">0</span>
      <span className="flex">
        {heatLegend.map((s, i) => (
          <span
            key={s.from}
            className={cn('h-2.5 w-6 sm:w-8', i === 0 && 'rounded-l-sm', i === heatLegend.length - 1 && 'rounded-r-sm')}
            style={{ backgroundColor: s.bg }}
          />
        ))}
      </span>
      <span className="font-mono">1</span>
    </div>
  );
}

export function SimilarityTable({ rec }: { rec: Recording }) {
  const net = hasNetworkActivity(rec);
  const rows: (ResourceKind | 'overall')[] = [...resourceKinds, 'overall'];
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] lg:gap-10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[18.5rem] border-collapse text-sm">
          <caption className="sr-only">
            Similarity of each pair of runs and set similarity, per resource type and overall
          </caption>
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th scope="col" className="pb-2 text-left font-medium">
                Resource type
              </th>
              {runPairs.map(([a, b]) => (
                <th
                  key={`${a}-${b}`}
                  scope="col"
                  className="w-[3.6rem] px-0.5 pb-2 text-center font-mono font-medium sm:w-20"
                >
                  <span aria-hidden>
                    R{a}-R{b}
                  </span>
                  <span className="sr-only">
                    Run {a} and Run {b}
                  </span>
                </th>
              ))}
              <th scope="col" className="w-14 pb-2 pl-2 text-right font-medium sm:w-20">
                Set
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((k) => {
              const s = rec.similarity[k];
              const overall = k === 'overall';
              const noNetwork = k === 'hosts' && !net;
              const Icon = overall ? Sigma : resourceIcons[k];
              return (
                <tr key={k} className={cn(overall && 'border-t')}>
                  <th scope="row" className={cn('py-0.5 pr-2 text-left align-middle font-normal', overall && 'pt-2')}>
                    <span className={cn('flex items-center gap-2', overall && 'font-semibold')}>
                      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                      {overall ? 'Overall' : resourceLabels[k]}
                    </span>
                    {noNetwork && <span className="block pl-5.5 text-xs text-muted-foreground">no host contacted</span>}
                  </th>
                  {s.pairs.map((v, i) => (
                    <td key={i} className={cn('px-0.5 py-0.5', overall && 'pt-2')}>
                      <HeatCell value={v} muted={noNetwork} />
                    </td>
                  ))}
                  <td
                    className={cn(
                      'py-0.5 pl-2 text-right font-mono tabular-nums',
                      overall ? 'pt-2 text-base font-semibold' : 'font-medium'
                    )}
                  >
                    {formatSimilarity(s.mean)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 text-xs leading-relaxed text-muted-foreground lg:pt-7">
        <HeatLegend />
        <p>
          1 means the same resources in the same proportions, 0 means no resource in common. Set is the mean of the
          pairs; overall is the mean of the resource types.
        </p>
        {!net && (
          <p>
            No run contacted a host other than the model provider. The recorded report scores host similarity as 1.00
            in that case, and the overall score includes it.
          </p>
        )}
      </div>
    </div>
  );
}

/* Resources per run --------------------------------------------------------------------------------------------- */

function DiffMarker({ differs }: { differs: boolean }) {
  return (
    <span className="mt-[0.4rem] flex h-1.5 w-1.5 shrink-0">
      {differs && (
        <>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-spy" />
          <span className="sr-only">Counts differ between runs: </span>
        </>
      )}
    </span>
  );
}

// Offer line breaks after path separators (and after dots in host names) so long names wrap at readable points on
// narrow screens; overflow-wrap still breaks a single segment that is longer than the column.
function Breakable({ text, after }: { text: string; after: string }) {
  const parts: string[] = [];
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === after) {
      parts.push(text.slice(start, i + 1));
      start = i + 1;
    }
  }
  if (start < text.length) parts.push(text.slice(start));
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <wbr />}
        </span>
      ))}
    </>
  );
}

function ResourceName({ kind, name }: { kind: ResourceKind; name: string }) {
  const after = kind === 'hosts' ? '.' : '/';
  if (kind === 'files') {
    const i = name.indexOf(':');
    if (i > 0) {
      return (
        <span className="font-mono text-xs [overflow-wrap:anywhere]">
          <span className="text-muted-foreground">{name.slice(0, i + 1)}</span>
          <Breakable text={name.slice(i + 1)} after={after} />
        </span>
      );
    }
  }
  return (
    <span className="font-mono text-xs [overflow-wrap:anywhere]">
      <Breakable text={name} after={after} />
    </span>
  );
}

function CountCell({ value, className }: { value: number; className?: string }) {
  return (
    <td className={cn('px-2 py-1.5 text-right font-mono text-xs tabular-nums sm:px-3', className)}>
      {value === 0 ? (
        <>
          <span aria-hidden className="text-muted-foreground/70">
            -
          </span>
          <span className="sr-only">0</span>
        </>
      ) : (
        formatCount(value)
      )}
    </td>
  );
}

function ResourceTable({ kind, block }: { kind: ResourceKind; block: ResourceBlock }) {
  if (block.total.every((n) => n === 0)) {
    return (
      <p className="rounded-xl border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
        {kind === 'hosts' ? 'No run contacted a host other than the model provider.' : `No ${kind} recorded in any run.`}
      </p>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[18rem] border-collapse text-sm">
        <caption className="sr-only">{resourceLabels[kind]}: count per run</caption>
        <thead className="bg-muted/50 text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              {resourceLabels[kind]}
            </th>
            {runNumbers.map((r) => (
              <th key={r} scope="col" className="w-12 px-2 py-2 text-right font-mono font-medium sm:w-16 sm:px-3">
                <span aria-hidden>R{r}</span>
                <span className="sr-only">Run {r}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {block.rows.map((row) => (
            <tr key={row.name} className="align-top">
              <th scope="row" className="px-3 py-1.5 text-left font-normal">
                <span className="flex gap-2">
                  <DiffMarker differs={row.differs} />
                  <ResourceName kind={kind} name={row.name} />
                </span>
              </th>
              {row.counts.map((c, i) => (
                <CountCell key={i} value={c} />
              ))}
            </tr>
          ))}
          {block.other && (
            <tr className="align-top text-muted-foreground">
              <th scope="row" className="px-3 py-1.5 text-left text-xs font-normal italic">
                <span className="flex gap-2">
                  <DiffMarker differs={false} />
                  other ({formatCount(block.other.distinct)} distinct)
                </span>
              </th>
              {block.other.counts.map((c, i) => (
                <CountCell key={i} value={c} />
              ))}
            </tr>
          )}
        </tbody>
        <tfoot className="border-t-2 bg-muted/30">
          <tr>
            <th scope="row" className="px-3 py-1.5 text-left text-xs font-semibold">
              Total
            </th>
            {block.total.map((c, i) => (
              <CountCell key={i} value={c} className="font-semibold" />
            ))}
          </tr>
          <tr className="border-t">
            <th scope="row" className="px-3 py-1.5 text-left text-xs font-medium text-muted-foreground">
              Distinct
            </th>
            {block.distinct.map((c, i) => (
              <CountCell key={i} value={c} className="text-muted-foreground" />
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function ResourceTables({ rec }: { rec: Recording }) {
  return (
    <Tabs defaultValue="commands" className="max-w-3xl gap-3">
      <TabsList aria-label="Resource type" className="h-10 w-full sm:w-fit">
        {resourceKinds.map((k) => {
          const Icon = resourceIcons[k];
          return (
            <TabsTrigger key={k} value={k} className="px-3 data-[state=active]:text-foreground">
              <Icon aria-hidden />
              {resourceLabels[k]}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {resourceKinds.map((k) => (
        <TabsContent
          key={k}
          value={k}
          className="rounded-xl focus-visible:ring-2 focus-visible:ring-spy/50 focus-visible:ring-offset-2"
        >
          <ResourceTable kind={k} block={rec.resources[k]} />
        </TabsContent>
      ))}
      <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-spy" />
          Counts differ between runs
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="font-mono">
            -
          </span>
          Not used in the run
        </li>
        <li>Top 10 resources by count; other groups the rest</li>
      </ul>
    </Tabs>
  );
}
