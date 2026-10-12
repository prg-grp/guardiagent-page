import { cn } from '@/lib/utils';
import { Circle, CircleCheck, LoaderCircle } from 'lucide-react';

// Staged progress shown while the replay "runs". Durations in ms; the reduced-motion schedule totals about 0.5 s.
export const runSteps = [
  'Boot a fresh Firecracker microVM',
  'Run codex three times',
  'Record system calls and network traffic',
  'Build a star graph per run',
  'Compare the runs',
] as const;

export const stepDurations = [650, 850, 750, 600, 550];
export const reducedStepDurations = [100, 100, 100, 100, 100];

export function RunProgress({
  step,
  modelId,
  taskId,
  harness,
}: {
  step: number;
  modelId: string;
  taskId: string;
  harness: string;
}) {
  const pct = Math.round((step / runSteps.length) * 100);
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-3 md:px-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-spy-soft uppercase">Replaying recorded runs</p>
        <p className="font-mono text-xs break-all text-slate-400">
          {modelId} / {taskId} / {harness}
        </p>
      </div>
      <div className="px-5 py-5 md:px-6">
        <div
          role="progressbar"
          aria-label="Replay progress"
          aria-valuemin={0}
          aria-valuemax={runSteps.length}
          aria-valuenow={step}
          aria-valuetext={`Step ${Math.min(step + 1, runSteps.length)} of ${runSteps.length}`}
          className="h-1 w-full overflow-hidden rounded-full bg-white/10"
        >
          <div
            className="h-full rounded-full bg-spy-soft transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${Math.max(pct, 4)}%` }}
          />
        </div>
        <ol className="mt-5 space-y-3">
          {runSteps.map((label, i) => {
            const state = i < step ? 'done' : i === step ? 'active' : 'pending';
            return (
              <li key={label} className="flex items-center gap-3 text-sm">
                {state === 'done' && <CircleCheck className="h-4 w-4 shrink-0 text-spy-soft" aria-hidden />}
                {state === 'active' && (
                  <LoaderCircle className="h-4 w-4 shrink-0 text-white motion-safe:animate-spin" aria-hidden />
                )}
                {state === 'pending' && <Circle className="h-4 w-4 shrink-0 text-slate-600" aria-hidden />}
                <span
                  className={cn(
                    state === 'done' && 'text-slate-200',
                    state === 'active' && 'font-medium text-white',
                    state === 'pending' && 'text-slate-400'
                  )}
                >
                  {label}
                  <span className="sr-only">
                    {state === 'done' ? ' (done)' : state === 'active' ? ' (in progress)' : ' (pending)'}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
