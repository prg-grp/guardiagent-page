import { cn } from '@/lib/utils';
import { ScanEye, Shield } from 'lucide-react';

export type Pillar = 'bound' | 'spy';

export const pillarMeta = {
  bound: { name: 'AgentBound', mode: 'Prevent', boundary: 'Tool boundary', icon: Shield },
  spy: { name: 'AgentSpy', mode: 'Observe', boundary: 'OS boundary', icon: ScanEye },
} as const;

const tones = {
  bound: {
    soft: 'bg-bound/10 text-bound border-bound/20',
    solid: 'bg-bound text-white border-bound',
    dark: 'bg-bound-soft/10 text-bound-soft border-bound-soft/30',
  },
  spy: {
    soft: 'bg-spy/10 text-spy border-spy/20',
    solid: 'bg-spy text-white border-spy',
    dark: 'bg-spy-soft/10 text-spy-soft border-spy-soft/30',
  },
};

// Teal and violet are always paired with an icon and a text label, never color alone.
export function PillarBadge({
  pillar,
  variant = 'soft',
  showName = true,
  showMode = true,
  className,
}: {
  pillar: Pillar;
  variant?: 'soft' | 'solid' | 'dark';
  showName?: boolean;
  showMode?: boolean;
  className?: string;
}) {
  const meta = pillarMeta[pillar];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap',
        tones[pillar][variant],
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {showName && meta.name}
      {showName && showMode && <span aria-hidden>·</span>}
      {showMode && meta.mode}
    </span>
  );
}

export function PillarIcon({ pillar, className }: { pillar: Pillar; className?: string }) {
  const Icon = pillarMeta[pillar].icon;
  return <Icon className={cn(pillar === 'bound' ? 'text-bound' : 'text-spy', className)} aria-hidden />;
}
