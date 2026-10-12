import { PillarBadge } from '@/components/pillar-badge';
import { relevanceLabels, type Relevance } from '@/lib/incidents';
import { Building2, FlaskConical, Info } from 'lucide-react';

// Short glosses of the rating levels; the full wording is in relevanceDescriptions (lib/incidents.ts).
const levels: { level: Relevance; gloss?: string }[] = [
  { level: 'evaluated', gloss: 'the paper evaluated this class of behavior, not this incident' },
  { level: 'principle', gloss: 'the same control applies, but was not evaluated in this setting' },
  { level: 'limited', gloss: 'the harm stays mostly inside the permitted scope, or outside the threat model' },
  { level: 'none' },
];

const row = 'grid gap-2 py-4 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-6';

export function IncidentLegend() {
  return (
    <div className="mb-8 border-y text-sm leading-relaxed">
      <dl className="divide-y">
        <div className={row}>
          <dt className="font-semibold">Setting</dt>
          <dd>
            <ul className="flex flex-col gap-1.5 text-muted-foreground lg:flex-row lg:gap-8">
              <li className="flex items-start gap-2">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
                Real use: production or internal deployment.
              </li>
              <li className="flex items-start gap-2">
                <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Any other setting, such as an evaluation or a research study. Most lab-disclosed cases happened in
                training or evaluation.
              </li>
            </ul>
          </dd>
        </div>
        <div className={row}>
          <dt className="font-semibold">Rating</dt>
          <dd className="text-muted-foreground">
            <p className="mb-2">
              Each card rates <PillarBadge pillar="bound" className="px-2 py-0.5" /> and{' '}
              <PillarBadge pillar="spy" className="px-2 py-0.5" /> separately.
            </p>
            <ul className="grid gap-x-8 gap-y-1 md:grid-cols-2">
              {levels.map(({ level, gloss }) => (
                <li key={level}>
                  <span className="font-medium text-foreground">{relevanceLabels[level]}</span>
                  {gloss && <>: {gloss}</>}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      <p className="flex items-start gap-2 border-t py-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span>
          A rating names the class of control that applies, not a claim that AgentBound or AgentSpy would have
          prevented or detected the incident: we ran neither prototype on these cases.
        </span>
      </p>
    </div>
  );
}
