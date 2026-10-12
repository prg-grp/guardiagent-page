import { cn } from '@/lib/utils';
import { ArrowDown, ArrowRight, ClipboardCheck, Cog, Layers, Package, Server, Workflow } from 'lucide-react';
import type React from 'react';
import { Fragment } from 'react';

// AgentSpy overview (Fig. 1, §3.1-3.3 of the paper): execution kind -> orchestrator -> microVM with execution
// manager -> run artifacts -> analysis runner -> report.

type Step = { icon: React.ElementType; title: string; body: string; vm?: boolean };

const steps: Step[] = [
  {
    icon: Layers,
    title: 'Execution kind',
    body: 'Declares the image, network, user permissions, task setup and agent parameters.',
  },
  { icon: Workflow, title: 'Orchestrator', body: 'Boots a fresh microVM for each run and enforces the global timeout.' },
  {
    icon: Server,
    title: 'Execution manager',
    body: 'Starts monitoring, runs the agent and collects the records, also when the agent fails or times out.',
    vm: true,
  },
  {
    icon: Package,
    title: 'Run artifacts',
    body: 'System calls and network traffic of the agent and every process it starts, copied to the host.',
  },
  {
    icon: Cog,
    title: 'Analysis runner',
    body: 'Reads only the stored artifacts, so analyses can be re-run without running the agent again.',
  },
  {
    icon: ClipboardCheck,
    title: 'Report',
    body: 'Star graphs, similarity and skill coverage for reliability; alerts for security.',
  },
];

function Connector({ className }: { className?: string }) {
  return (
    <li aria-hidden className={cn('flex shrink-0 items-center justify-center text-muted-foreground', className)}>
      <ArrowDown className="h-5 w-5 lg:hidden" />
      <ArrowRight className="hidden h-4 w-4 lg:block" />
    </li>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;
  return (
    <li
      className={cn(
        'relative flex min-w-0 flex-col rounded-2xl border bg-card p-4 md:p-5',
        step.vm && 'border-2 border-dashed border-spy/50 bg-spy/5'
      )}
    >
      {step.vm && (
        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-spy/10 px-2.5 py-0.5 text-[11px] font-semibold text-spy">
          Firecracker microVM
        </span>
      )}
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="min-w-0 flex-1 text-sm font-semibold">
          <span className="sr-only">Step {index + 1}: </span>
          {step.title}
        </h3>
        <span className="font-mono text-xs text-muted-foreground" aria-hidden>
          {index + 1}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
    </li>
  );
}

// Phones and tablets: one column with down arrows. Desktop: two rows of three steps with arrows inside each row;
// the arrow after step 3 is hidden there, and the step numbers carry the order into the second row.
export function Pipeline({ className }: { className?: string }) {
  return (
    <ol
      className={cn(
        'flex flex-col gap-2 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-2 lg:gap-y-4',
        className
      )}
    >
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <StepCard step={step} index={i} />
          {i < steps.length - 1 && <Connector className={i === 2 ? 'lg:hidden' : undefined} />}
        </Fragment>
      ))}
    </ol>
  );
}
