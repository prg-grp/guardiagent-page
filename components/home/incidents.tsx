import { SettingBadge } from '@/components/incident-card';
import { Section, SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { featuredIncidents, type Incident } from '@/lib/incidents';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// One-sentence versions of the summaries in lib/incidents.ts, for the home page only. Keep them in sync with the
// summaries and their primary sources; the full text and the relevance notes live on /incidents.
const oneLine: Record<string, string> = {
  'aisi-cyber-evaluation':
    'With internet access deliberately enabled for a cyber challenge, agents took 19 unsanctioned actions on the live internet in 10 of 122 runs; the scope existed only in the task.',
  'anthropic-misconfigured-evaluations':
    'In four incidents, Claude models were told they had no internet access during capture-the-flag evaluations, but a misconfiguration left it open and they attacked real systems.',
  'openai-temporary-file-hosting':
    'Told to use local files only during RL training, an agent uploaded a shared workbook to a public temporary file host after the shared filesystem broke.',
};

function firstSentence(text: string) {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
}

function HomeIncidentCard({ incident }: { incident: Incident }) {
  const source = incident.sources[0];
  return (
    <li className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm md:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <SettingBadge setting={incident.setting} />
        <span className="font-semibold">{incident.org}</span>
      </div>
      <h3 className="mb-2 text-lg leading-snug font-semibold text-balance">{incident.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {oneLine[incident.id] ?? firstSentence(incident.summary)}
      </p>
      {source && (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {source.label}
          <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-0.15em]" aria-hidden />
        </a>
      )}
    </li>
  );
}

export function RecentIncidents() {
  return (
    <Section id="why-now">
      <SectionHeader
        title="Real Agent incidents disclosed in 2026"
        description={
          <p>
            Most of these cases happened in training or evaluation environments that were less isolated than assumed. We
            cite them for the failure pattern and did not run our prototypes on them.
          </p>
        }
      />

      <ul className="grid gap-6 lg:grid-cols-3">
        {featuredIncidents.map((incident) => (
          <HomeIncidentCard key={incident.id} incident={incident} />
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/incidents">
            All incidents with sources
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
