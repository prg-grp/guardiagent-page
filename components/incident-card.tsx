import { pillarMeta, type Pillar } from '@/components/pillar-badge';
import {
  boundaryLabels,
  relevanceLabels,
  occurredLabel,
  settingLabels,
  type Incident,
  type Relevance,
  type Setting,
} from '@/lib/incidents';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Building2, FlaskConical } from 'lucide-react';

const realWorld: Setting[] = ['production', 'internal-deployment'];

export function SettingBadge({ setting, className }: { setting: Setting; className?: string }) {
  const isReal = realWorld.includes(setting);
  const Icon = isReal ? Building2 : FlaskConical;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        isReal ? 'border-destructive/30 bg-destructive/5 text-destructive' : 'border-border bg-muted text-muted-foreground',
        className
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {settingLabels[setting]}
    </span>
  );
}

const levelStyles: Record<Relevance, string> = {
  evaluated: 'font-semibold',
  principle: '',
  limited: 'opacity-80',
  none: 'opacity-60',
};

export function RelevanceChip({ pillar, level }: { pillar: Pillar; level: Relevance }) {
  const meta = pillarMeta[pillar];
  const Icon = meta.icon;
  const color =
    level === 'limited' || level === 'none'
      ? 'border-border bg-muted text-muted-foreground'
      : pillar === 'bound'
        ? 'border-bound/30 bg-bound/10 text-bound'
        : 'border-spy/30 bg-spy/10 text-spy';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs whitespace-nowrap',
        color,
        levelStyles[level]
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      <span className="sr-only">{meta.name}: </span>
      {relevanceLabels[level]}
    </span>
  );
}

function RelevanceRow({ pillar, level, note }: { pillar: Pillar; level: Relevance; note: string }) {
  const meta = pillarMeta[pillar];
  return (
    <div className="grid gap-1.5 @md:grid-cols-[11rem_1fr] @md:gap-3">
      <div className="flex flex-col items-start gap-1">
        <span className={cn('text-xs font-semibold', pillar === 'bound' ? 'text-bound' : 'text-spy')}>
          {meta.mode} · {meta.name}
        </span>
        <RelevanceChip pillar={pillar} level={level} />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
    </div>
  );
}

export function IncidentCard({
  incident,
  compact = false,
  className,
}: {
  incident: Incident;
  compact?: boolean;
  className?: string;
}) {
  return (
    <article
      id={incident.id}
      className={cn('@container flex scroll-mt-24 flex-col rounded-2xl border bg-card p-5 shadow-sm md:p-6', className)}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <SettingBadge setting={incident.setting} />
        <span className="font-semibold text-foreground">{incident.org}</span>
      </div>
      <h3 className="mb-1 text-lg leading-snug font-semibold text-balance">{incident.title}</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        {occurredLabel(incident.occurred)} · Disclosed {incident.disclosed}
        {incident.models && <> · {incident.models}</>}
      </p>
      <p className={cn('mb-4 text-sm leading-relaxed', compact && 'line-clamp-6')}>{incident.summary}</p>

      {!compact && incident.boundaries.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {incident.boundaries.map((b) => (
            <span key={b} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {boundaryLabels[b]}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-3 border-t pt-4">
        <RelevanceRow pillar="bound" level={incident.bound.level} note={incident.bound.note} />
        <RelevanceRow pillar="spy" level={incident.observe.level} note={incident.observe.note} />
        {!compact && incident.neither && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Neither layer addresses: </span>
            {incident.neither}
          </p>
        )}
        {!compact && incident.caveat && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Caveat: </span>
            {incident.caveat}
          </p>
        )}
      </div>

      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm">
        {(compact ? incident.sources.slice(0, 1) : incident.sources).map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {s.label}
            <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.15em]" aria-hidden />
          </a>
        ))}
      </div>
    </article>
  );
}
