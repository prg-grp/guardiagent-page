import { computeFindings } from '@/components/agentspy/simulator/findings';
import {
  allEqual,
  asRecording,
  formatCount,
  formatSimilarity,
  runMetrics,
  type DemoModel,
  type DemoTask,
  type RunMetrics,
} from '@/components/agentspy/simulator/model';
import { ResourceTables, SimilarityTable, TrajectoryContrast } from '@/components/agentspy/simulator/report-sections';
import { Button } from '@/components/ui/button';
import { demoHarness, demoResult, similarityReference } from '@/lib/agentspy-demo';
import { agentSpy } from '@/lib/papers';
import { History, RotateCcw, ScanEye, SlidersHorizontal } from 'lucide-react';
import type React from 'react';

const paperHref = agentSpy.links.find((l) => l.label.startsWith('arXiv'))?.href ?? 'https://arxiv.org/abs/2610.06001';

function ReportSection({
  index,
  title,
  intro,
  children,
}: {
  index: number;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-6 md:px-8 md:py-7">
      <h4 className="flex items-baseline gap-3 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
        <span aria-hidden className="font-mono text-spy">
          {String(index).padStart(2, '0')}
        </span>
        {title}
      </h4>
      {intro && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{intro}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Meta({ label, value, sub }: { label: string; value: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-medium tracking-[0.12em] text-slate-400 uppercase">{label}</dt>
      <dd className="mt-1 text-sm font-medium break-words text-white">{value}</dd>
      {sub && <dd className="text-xs text-slate-400">{sub}</dd>}
    </div>
  );
}

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-background p-4">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-2">{children}</dd>
    </div>
  );
}

function PerRun({ values }: { values: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {values.map((v, i) => (
        <div key={i} className="min-w-0">
          <div aria-hidden className="font-mono text-[11px] text-muted-foreground">
            R{i + 1}
          </div>
          <div className="text-xl font-semibold">
            <span className="sr-only">Run {i + 1}: </span>
            {v}
          </div>
        </div>
      ))}
    </div>
  );
}

function SimilarityScale({ value }: { value: number }) {
  const marks = [
    { v: similarityReference.mixedTasks, label: formatSimilarity(similarityReference.mixedTasks) },
    { v: similarityReference.sameTask, label: formatSimilarity(similarityReference.sameTask) },
  ];
  return (
    <div aria-hidden className="mt-3">
      <div className="relative h-1.5 rounded-full bg-muted">
        {marks.map((m) => (
          <span
            key={m.v}
            className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-slate-400"
            style={{ left: `${m.v * 100}%` }}
          />
        ))}
        <span
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spy ring-2 ring-background"
          style={{ left: `${Math.min(Math.max(value, 0), 1) * 100}%` }}
        />
      </div>
      <div className="relative mt-1 h-4 font-mono text-[10px] text-muted-foreground">
        <span className="absolute left-0">0</span>
        {marks.map((m) => (
          <span key={m.v} className="absolute -translate-x-1/2" style={{ left: `${m.v * 100}%` }}>
            {m.label}
          </span>
        ))}
        <span className="absolute right-0">1</span>
      </div>
    </div>
  );
}

function SummaryTiles({ metrics, overall }: { metrics: RunMetrics[]; overall: number }) {
  const testsTotal = metrics[0].testsTotal;
  const passed = metrics.map((m) => m.testsPassed);
  const skillTotal = metrics[0].skillTotal;
  return (
    <dl className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
      <Tile label="Tests passed">
        {allEqual(passed) ? (
          <>
            <p className="text-3xl font-semibold">
              {passed[0]}/{testsTotal}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">in every run</p>
          </>
        ) : (
          <>
            <PerRun values={passed.map((p) => `${p}/${testsTotal}`)} />
            <p className="mt-1 text-xs text-muted-foreground">tests per run</p>
          </>
        )}
      </Tile>
      <Tile label="Set similarity, overall">
        <p className="text-3xl font-semibold">{formatSimilarity(overall)}</p>
        <SimilarityScale value={overall} />
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          Paper averages (gpt-5.6-terra, §4.1): {formatSimilarity(similarityReference.sameTask)} for three runs of the
          same task, {formatSimilarity(similarityReference.mixedTasks)} for sets mixed with another task.
        </p>
      </Tile>
      <Tile label="Skill files used">
        <PerRun values={metrics.map((m) => formatCount(m.skillUsed))} />
        <p className="mt-1 text-xs text-muted-foreground">of {formatCount(skillTotal)} skill files, per run</p>
      </Tile>
      <Tile label="Agent time">
        <PerRun values={metrics.map((m) => `${m.seconds} s`)} />
        <p className="mt-1 text-xs text-muted-foreground">per run</p>
      </Tile>
    </dl>
  );
}

export function Report({
  model,
  task,
  headingId,
  headingRef,
  onRunAgain,
  onChangeSelection,
}: {
  model: DemoModel;
  task: DemoTask;
  headingId: string;
  headingRef: React.Ref<HTMLHeadingElement>;
  onRunAgain: () => void;
  onChangeSelection: () => void;
}) {
  const result = demoResult(model.id, task.id);
  const rec = asRecording(result);
  const metrics = runMetrics(rec);
  const findings = computeFindings(result, task);

  return (
    <article
      aria-labelledby={headingId}
      className="overflow-hidden rounded-2xl border bg-background shadow-sm motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
    >
      <header className="bg-slate-950 px-5 py-5 text-white md:px-8 md:py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-spy-soft uppercase">
            <ScanEye className="h-4 w-4" aria-hidden />
            AgentSpy
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
            <History className="h-3.5 w-3.5" aria-hidden />
            Replay of recorded data
          </span>
        </div>
        <h3
          id={headingId}
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 scroll-mt-24 text-xl font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-spy-soft/60 md:text-2xl"
        >
          AgentSpy reliability report
        </h3>
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-4 md:grid-cols-4">
          <Meta label="Model" value={<span className="font-mono">{model.id}</span>} sub={model.provider} />
          <Meta label="Task" value={task.title} sub={<span className="font-mono">{task.id}</span>} />
          <Meta label="Harness" value={demoHarness} />
          <Meta label="Runs" value="3" sub="each in a fresh microVM" />
        </dl>
      </header>

      <div className="divide-y">
        <ReportSection index={1} title="Summary">
          <SummaryTiles metrics={metrics} overall={rec.similarity.overall.mean} />
        </ReportSection>

        <ReportSection index={2} title="Findings">
          <ol className="divide-y rounded-xl border">
            {findings.map((f, i) => (
              <li key={f.id} className="flex gap-3 px-4 py-3 text-sm leading-relaxed">
                <span aria-hidden className="mt-px font-mono text-xs leading-relaxed text-muted-foreground">
                  F{i + 1}
                </span>
                <span className="min-w-0">
                  {f.segments.map((s, j) =>
                    typeof s === 'string' ? (
                      <span key={j}>{s}</span>
                    ) : (
                      <code key={j} className="rounded bg-muted px-[3px] py-0.5 font-mono text-[0.8em] break-all">
                        {s.code}
                      </code>
                    )
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-xs text-muted-foreground">Computed by fixed rules from the recorded data.</p>
        </ReportSection>

        <ReportSection
          index={3}
          title="Trajectory vs. system record"
          intro="The trajectory is the agent's own list of tool calls. The system record is what AgentSpy observed at the operating system for the agent and every process it started."
        >
          <TrajectoryContrast metrics={metrics} />
        </ReportSection>

        <ReportSection
          index={4}
          title="Similarity by resource type"
          intro="Weighted Jaccard similarity of resource proportions between two runs (§3.4.2)."
        >
          <SimilarityTable rec={rec} />
        </ReportSection>

        <ReportSection index={5} title="Resources per run" intro="Counts from each run's star graph.">
          <ResourceTables rec={rec} />
        </ReportSection>
      </div>

      <footer className="border-t bg-muted/40 px-5 py-5 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              Source: recorded AgentSpy executions from the paper&apos;s experiments ({demoHarness}, three runs per model
              and task). Method in §3.4, results in <span className="whitespace-nowrap">§4.1-4.2</span> of the{' '}
              <a
                href={paperHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-spy underline underline-offset-2 hover:no-underline"
              >
                AgentSpy paper
              </a>
              .
            </p>
            <p>
              This replay covers the reliability analysis only. The security analysis, which checks the recorded system
              calls against prohibition rules (§3.5, §4.3), is not part of it.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onChangeSelection}>
              <SlidersHorizontal aria-hidden />
              Change selection
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={onRunAgain}
              className="bg-spy text-white hover:bg-spy/90 focus-visible:ring-spy/40"
            >
              <RotateCcw aria-hidden />
              Run again
            </Button>
          </div>
        </div>
      </footer>
    </article>
  );
}
