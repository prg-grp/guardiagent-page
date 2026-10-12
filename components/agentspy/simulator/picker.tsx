'use client';

import { cn } from '@/lib/utils';
import type { DemoModelId, DemoTaskId } from '@/lib/agentspy-demo';
import { demoModels, demoTasks } from '@/lib/agentspy-demo';
import { useId } from 'react';
import type React from 'react';

// Selectable cards built on native radio inputs: arrow keys move within a group, Tab leaves it, and the checked
// state is announced by screen readers. The visual card reacts to :checked and :focus-visible of its input. The
// card's heading line names the radio; the rest of the card is its description, so the name stays short.

export function StepNumber({ n, className }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-spy text-xs font-semibold text-white',
        className
      )}
    >
      {n}
    </span>
  );
}

function OptionCard({
  name,
  value,
  checked,
  onSelect,
  title,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onSelect: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <label
      className={cn(
        'relative flex cursor-pointer gap-3 rounded-xl border bg-background p-3.5 transition-colors sm:p-4',
        'hover:border-spy/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-spy/50 has-[:focus-visible]:ring-offset-2',
        checked ? 'border-spy bg-spy/[0.04] shadow-sm' : 'border-border'
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-desc`}
        className="sr-only"
      />
      <span
        aria-hidden
        className={cn(
          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
          checked ? 'border-spy bg-spy' : 'border-slate-300 bg-background'
        )}
      >
        <span className={cn('h-1.5 w-1.5 rounded-full bg-white', !checked && 'invisible')} />
      </span>
      <span className="min-w-0 flex-1">
        <span id={`${id}-title`} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          {title}
        </span>
        <span id={`${id}-desc`} className="block">
          {children}
        </span>
      </span>
    </label>
  );
}

export function ModelPicker({
  name,
  value,
  onChange,
}: {
  name: string;
  value: DemoModelId;
  onChange: (id: DemoModelId) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <StepNumber n={1} />
        Pick a model
      </legend>
      <div className="grid gap-2.5">
        {demoModels.map((m) => (
          <OptionCard
            key={m.id}
            name={name}
            value={m.id}
            checked={value === m.id}
            onSelect={() => onChange(m.id)}
            title={
              <>
                <span className="font-mono text-sm font-semibold">{m.id}</span>{' '}
                <span className="text-xs text-muted-foreground">{m.provider}</span>
              </>
            }
          >
            <span className="mt-1 block text-sm text-muted-foreground">{m.note}</span>
          </OptionCard>
        ))}
      </div>
    </fieldset>
  );
}

export function TaskPicker({
  name,
  value,
  onChange,
}: {
  name: string;
  value: DemoTaskId;
  onChange: (id: DemoTaskId) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <StepNumber n={2} />
        Pick a task
      </legend>
      <div className="grid gap-2.5">
        {demoTasks.map((t) => (
          <OptionCard
            key={t.id}
            name={name}
            value={t.id}
            checked={value === t.id}
            onSelect={() => onChange(t.id)}
            title={
              <>
                <span className="text-sm font-semibold">{t.title}</span>{' '}
                <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
              </>
            }
          >
            <span className="mt-1 block text-sm text-muted-foreground">{t.task}</span>
            <span className="mt-2.5 block space-y-1.5 border-t pt-2.5">
              {t.skills.map((s) => (
                <span key={s.name} className="block text-xs leading-relaxed text-muted-foreground">
                  <span className="font-mono font-medium text-foreground">{s.name}</span>
                  <span className="text-muted-foreground">
                    {' '}
                    skill, {s.files} {s.files === 1 ? 'file' : 'files'}.
                  </span>{' '}
                  {s.summary}
                </span>
              ))}
            </span>
          </OptionCard>
        ))}
      </div>
    </fieldset>
  );
}
