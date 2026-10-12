import type { PaperStat } from '@/lib/papers';
import { cn } from '@/lib/utils';

export function Stat({
  stat,
  tone = 'bound',
  dark = false,
  className,
}: {
  stat: PaperStat;
  tone?: 'bound' | 'spy' | 'neutral';
  dark?: boolean;
  className?: string;
}) {
  const valueTone = {
    bound: dark ? 'text-bound-soft' : 'text-bound',
    spy: dark ? 'text-spy-soft' : 'text-spy',
    neutral: dark ? 'text-white' : 'text-foreground',
  };
  return (
    <div className={cn('flex flex-col', className)}>
      <div className={cn('text-3xl font-bold tracking-tight tabular-nums md:text-4xl', valueTone[tone])}>
        {stat.value}
      </div>
      <div className={cn('mt-1 text-sm leading-snug', dark ? 'text-slate-300' : 'text-muted-foreground')}>
        {stat.label}
      </div>
      <div className={cn('mt-1 text-xs', dark ? 'text-slate-500' : 'text-muted-foreground/70')}>{stat.source}</div>
    </div>
  );
}
