import { DocLink } from '@/components/developers/doc-link';
import { PillarBadge, type Pillar } from '@/components/pillar-badge';
import { agentBound, agentSpy, githubRepos } from '@/lib/papers';
import { cn } from '@/lib/utils';

type StatusRow = {
  pillar: Pillar;
  status: string;
  statusClass: string;
  detail: string;
  available: string;
  links: { label: string; href: string }[];
};

const zenodo = agentBound.links.find((l) => l.href.includes('zenodo'));
const spyArxiv = agentSpy.links[0];

const rows: StatusRow[] = [
  {
    pillar: 'bound',
    status: 'Code available',
    statusClass: 'text-bound',
    detail: `${agentBound.status}, ${agentBound.venueShort}`,
    available:
      'Docker sandbox images for MCP servers from npm and PyPI, and a Python wrapper for the OpenAI Agents SDK. ' +
      "It covers MCP servers, not the agent's own shell or skills.",
    links: [
      ...githubRepos,
      ...(zenodo ? [{ label: 'Replication package', href: zenodo.href }] : []),
      { label: 'Research page', href: agentBound.href },
    ],
  },
  {
    pillar: 'spy',
    status: 'Preprint',
    statusClass: 'text-foreground',
    detail: `${agentSpy.venue}, ${agentSpy.date}`,
    available: 'The paper describes the method and its system-call rules.',
    links: [
      { label: `Paper (${spyArxiv.label})`, href: spyArxiv.href },
      { label: 'Research page', href: agentSpy.href },
      { label: 'Contact us', href: '/#contact' },
    ],
  },
];

// One layout for every width: stacked on phones, three columns from md up.
export function StatusTable() {
  return (
    <ul className="divide-y rounded-2xl border bg-card shadow-sm">
      {rows.map((row) => (
        <li
          key={row.pillar}
          className="grid min-w-0 grid-cols-1 gap-3 p-5 md:grid-cols-[13rem_minmax(0,1fr)_minmax(0,18rem)] md:gap-8 md:p-6"
        >
          <div className="min-w-0">
            <PillarBadge pillar={row.pillar} />
            <p className={cn('mt-2 text-sm font-semibold', row.statusClass)}>{row.status}</p>
            <p className="text-sm text-muted-foreground">{row.detail}</p>
          </div>
          <p className="min-w-0 leading-relaxed">{row.available}</p>
          <ul className="min-w-0 space-y-1.5 text-sm">
            {row.links.map((l) => (
              <li key={l.href}>
                <DocLink
                  href={l.href}
                  className="font-medium wrap-anywhere text-primary underline-offset-4 hover:underline"
                >
                  {l.label}
                </DocLink>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
