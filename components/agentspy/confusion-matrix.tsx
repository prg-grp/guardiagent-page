import { cn } from '@/lib/utils';
import { BellOff, CircleCheck, CircleMinus, TriangleAlert } from 'lucide-react';
import type React from 'react';

// RQ3 (§4.3, Fig. 5 of the AgentSpy paper): security alerts across the 50 Skill-Inject runs.

function MatrixCell({
  value,
  label,
  note,
  icon: Icon,
  tone,
}: {
  value: number;
  label: string;
  note?: React.ReactNode;
  icon: React.ElementType;
  tone: 'hit' | 'miss' | 'neutral';
}) {
  const tones = {
    hit: 'border-spy/30 bg-spy/10',
    miss: 'border-alert/40 bg-alert/10',
    neutral: 'border-border bg-card',
  };
  const iconTone = { hit: 'text-spy', miss: 'text-alert', neutral: 'text-muted-foreground' };
  return (
    <div className={cn('flex min-w-0 flex-col rounded-xl border p-3 md:p-4', tones[tone])}>
      <div className="flex items-center gap-1.5 text-xs font-medium md:text-sm">
        <Icon className={cn('h-3.5 w-3.5 shrink-0 md:h-4 md:w-4', iconTone[tone])} aria-hidden />
        <span>{label}</span>
      </div>
      <div className="mt-1 text-3xl font-bold tabular-nums md:text-4xl">{value}</div>
      {note && <div className="mt-1 text-xs leading-snug text-muted-foreground">{note}</div>}
    </div>
  );
}

export function ConfusionMatrix({ className }: { className?: string }) {
  return (
    <figure className={cn('min-w-0', className)}>
      <div
        role="table"
        aria-label="AgentSpy alerts versus whether the injected behavior was executed, across 50 Skill-Inject runs"
        className="grid grid-cols-[3.25rem_minmax(0,1fr)_minmax(0,1fr)] gap-2 md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-3"
      >
        <div role="row" className="contents">
          <div role="columnheader" />
          <div role="columnheader" className="px-1 text-xs leading-tight md:text-sm">
            <span className="font-semibold">Injected behavior executed</span>
            <span className="block text-muted-foreground">18 runs</span>
          </div>
          <div role="columnheader" className="px-1 text-xs leading-tight md:text-sm">
            <span className="font-semibold">Not executed</span>
            <span className="block text-muted-foreground">32 runs</span>
          </div>
        </div>

        <div role="row" className="contents">
          <div role="rowheader" className="self-center text-xs font-semibold md:text-sm">
            Alert
          </div>
          <div role="cell">
            <MatrixCell value={14} label="Detected" icon={CircleCheck} tone="hit" note="Every executed S1 to S4 case" />
          </div>
          <div role="cell">
            <MatrixCell value={0} label="False alarms" icon={CircleMinus} tone="neutral" />
          </div>
        </div>

        <div role="row" className="contents">
          <div role="rowheader" className="self-center text-xs font-semibold md:text-sm">
            No alert
          </div>
          <div role="cell">
            <MatrixCell value={4} label="Missed" icon={TriangleAlert} tone="miss" note="All S5 backdoor" />
          </div>
          <div role="cell">
            <MatrixCell value={32} label="Correctly silent" icon={BellOff} tone="neutral" note="25 control, 7 declined" />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm">
        <span>
          Precision <span className="font-semibold tabular-nums">1.00</span>
        </span>
        <span>
          Recall <span className="font-semibold tabular-nums">0.78</span>
        </span>
        <span className="text-muted-foreground">After Fig. 5 of the paper, 50 runs with gpt-5.1-codex-max</span>
      </figcaption>
    </figure>
  );
}
