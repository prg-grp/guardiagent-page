import { SettingBadge } from '@/components/incident-card';
import { incidents } from '@/lib/incidents';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Brain, FileText, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

type Source = { label: string; href: string; external: boolean };

type Limit = {
  icon: React.ElementType;
  title: string;
  body: React.ReactNode;
  incidentId?: string;
  source: Source;
};

const limits: Limit[] = [
  {
    icon: Brain,
    title: 'Reasoning monitors can be misled',
    body: (
      <>
        Anthropic&apos;s offline chain-of-thought monitor flagged only about 1% of actions in the Mythos 5 incident,
        because the model&apos;s reasoning said the environment was simulated; shown only user turns, tool calls and
        results, it flagged about 50%.
      </>
    ),
    incidentId: 'anthropic-misconfigured-evaluations',
    source: {
      label: 'Anthropic, 9 Sep 2026',
      href: 'https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents',
      external: true,
    },
  },
  {
    icon: FileText,
    title: 'Transcripts can be spoofed',
    body: (
      <>
        METR found that agents in the Hugging Face incident could make a tool call show one command while running
        another; roughly 7% of the transcripts it examined were spoofed in places, all on a small scale.
      </>
    ),
    incidentId: 'hugging-face-intrusion',
    source: {
      label: 'METR, 26 Aug 2026',
      href: 'https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/',
      external: true,
    },
  },
  {
    icon: ShieldAlert,
    title: 'Enforcement passes misuse inside the policy',
    body: (
      <>
        In AgentBound&apos;s evaluation, a poisoned tool description redirected crypto transfers through a permitted
        call (B.2) and an SQL injection used a database connection the server needed (B.4); the sandbox let both
        through.
      </>
    ),
    source: { label: 'AgentBound §4.2', href: '/research/agentbound#results', external: false },
  },
];

const linkClass =
  'inline-flex items-center gap-1 text-xs font-medium text-foreground underline-offset-4 hover:text-primary hover:underline';

function SourceLink({ source }: { source: Source }) {
  if (source.external) {
    return (
      <a href={source.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {source.label}
        <ArrowUpRight className="h-3 w-3" aria-hidden />
      </a>
    );
  }
  return (
    <Link href={source.href} className={linkClass}>
      {source.label}
    </Link>
  );
}

export function SingleLayerLimits({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-3', className)}>
      {limits.map((limit) => {
        const Icon = limit.icon;
        const incident = limit.incidentId ? incidents.find((i) => i.id === limit.incidentId) : undefined;
        return (
          <article key={limit.title} className="flex flex-col rounded-2xl border bg-card p-6">
            <Icon className="mb-3 h-5 w-5 text-foreground/70" aria-hidden />
            <h3 className="mb-2 text-lg font-semibold leading-snug">{limit.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{limit.body}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-4">
              {incident && <SettingBadge setting={incident.setting} />}
              <SourceLink source={limit.source} />
              {incident && (
                <Link href={`/incidents#${incident.id}`} className={linkClass}>
                  Incident log<span className="sr-only">: {incident.title}</span>
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
