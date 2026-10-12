import { RelevanceChip, SettingBadge } from '@/components/incident-card';
import { pillarMeta, type Pillar } from '@/components/pillar-badge';
import { boundaryLabels, type Incident, type Relevance, occurredLabel } from '@/lib/incidents';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

// Card for the /incidents log. Closed, it shows the setting, dates, a clamped summary, both ratings and the primary
// source; "Show details" adds the models, the boundary crossed, the rating notes, the gap, the caveat and every
// source. Used only inside the client IncidentExplorer, which owns the open state (deep links open their card).

function Rating({ pillar, level, note, open }: { pillar: Pillar; level: Relevance; note: string; open: boolean }) {
  return (
    <li>
      <span className="inline-flex flex-wrap items-center gap-1.5">
        {/* The chip carries the layer name for screen readers. */}
        <span className={cn('text-xs font-semibold', pillar === 'bound' ? 'text-bound' : 'text-spy')} aria-hidden>
          {pillarMeta[pillar].name}
        </span>
        <RelevanceChip pillar={pillar} level={level} />
      </span>
      {open && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{note}</p>}
    </li>
  );
}

function SourceLink({ label, url }: { label: string; url: string }) {
  // Keep the arrow on the same line as the last word when a long label wraps.
  const cut = label.lastIndexOf(' ');
  const head = cut === -1 ? '' : label.slice(0, cut + 1);
  const tail = cut === -1 ? label : label.slice(cut + 1);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline-offset-4 hover:underline"
    >
      {head}
      <span className="whitespace-nowrap">
        {tail}
        <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.15em]" aria-hidden />
      </span>
    </a>
  );
}

export function IncidentLogCard({
  incident,
  open,
  onToggle,
  className,
}: {
  incident: Incident;
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const sources = open ? incident.sources : incident.sources.slice(0, 1);
  const moreSources = incident.sources.length - sources.length;
  return (
    <article
      id={incident.id}
      className={cn('flex scroll-mt-24 flex-col rounded-2xl border bg-card p-5 shadow-sm md:p-6', className)}
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs">
        <SettingBadge setting={incident.setting} />
        <span className="font-semibold text-foreground">{incident.org}</span>
      </div>
      <h3 className="mb-1 text-lg leading-snug font-semibold text-balance">{incident.title}</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        {occurredLabel(incident.occurred)} · Disclosed {incident.disclosed}
      </p>
      <p className={cn('text-sm leading-relaxed', !open && 'line-clamp-3')}>{incident.summary}</p>

      {open && (incident.models || incident.boundaries.length > 0) && (
        <dl className="mt-3 flex flex-col gap-1 text-xs leading-relaxed">
          {incident.models && (
            <div>
              <dt className="inline font-semibold text-foreground">Models: </dt>
              <dd className="inline text-muted-foreground">{incident.models}</dd>
            </div>
          )}
          {incident.boundaries.length > 0 && (
            <div>
              <dt className="inline font-semibold text-foreground">Boundary crossed: </dt>
              <dd className="inline text-muted-foreground">
                {incident.boundaries.map((b) => boundaryLabels[b]).join(', ')}
              </dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-auto pt-4">
        <div className="border-t pt-4">
          <ul
            aria-label="Ratings"
            className={cn('flex gap-x-5', open ? 'flex-col gap-y-3' : 'flex-wrap gap-y-2')}
          >
            <Rating pillar="bound" level={incident.bound.level} note={incident.bound.note} open={open} />
            <Rating pillar="spy" level={incident.observe.level} note={incident.observe.note} open={open} />
          </ul>
          {open && incident.neither && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Neither layer addresses: </span>
              {incident.neither}
            </p>
          )}
          {open && incident.caveat && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Caveat: </span>
              {incident.caveat}
            </p>
          )}
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm" aria-label="Sources">
        {sources.map((s) => (
          <li key={s.url}>
            <SourceLink label={s.label} url={s.url} />
          </li>
        ))}
        {moreSources > 0 && (
          <li className="text-muted-foreground">
            +{moreSources} more {moreSources === 1 ? 'source' : 'sources'}
          </li>
        )}
      </ul>

      <button
        id={`${incident.id}-toggle`}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={incident.id}
        className={cn(
          'relative -mx-5 mt-5 -mb-5 flex items-center justify-between gap-2 rounded-b-2xl border-t px-5 py-3 text-left',
          'text-sm font-medium text-muted-foreground transition-colors outline-none',
          'hover:bg-muted/60 hover:text-foreground focus-visible:bg-muted/60 focus-visible:text-foreground',
          'focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'md:-mx-6 md:-mb-6 md:px-6'
        )}
      >
        {open ? 'Hide details' : 'Show details'}
        <span className="sr-only">: {incident.title}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
    </article>
  );
}
