import { PillarBadge, PillarIcon, pillarMeta, type Pillar } from '@/components/pillar-badge';
import { cn } from '@/lib/utils';

type ComparisonRow = { label: string; bound: string; spy: string };

// AgentBound §2.3, §3, §4.3, §5; AgentSpy §2.3, §3.3 to §3.6, §4.4.
const rows: ComparisonRow[] = [
  {
    label: 'Boundary',
    bound: 'Tool boundary: the files, environment variables and hosts one MCP server reaches.',
    spy: 'OS boundary: the system calls and network traffic of the agent and every process it starts.',
  },
  {
    label: 'When it acts',
    bound: 'During the run: an access outside the granted permissions is denied.',
    spy: 'After an audit run: rules and scores are computed over the recorded calls. Nothing is blocked.',
  },
  {
    label: 'Policy',
    bound: 'A default-deny manifest of capabilities; the user consents to concrete directories and hosts.',
    spy: 'Prohibitions: 4 rule classes over single system calls. Obligations: similarity across runs and skill coverage.',
  },
  {
    label: 'Runs in',
    bound: 'One Docker container per MCP server (AgentBox). The server is not modified.',
    spy: 'A disposable Firecracker microVM. The agent needs no instrumentation.',
  },
  {
    label: 'Threat model',
    bound: 'A malicious MCP server. The agent is assumed to behave as intended.',
    spy: "A malicious or modified skill (security), or the agent's own deviations (reliability).",
  },
  {
    label: 'Overhead',
    bound: 'A few hundred ms once at startup; 0.6 ms (macOS) and 0.29 ms (Debian) per operation.',
    spy: 'No statistically significant change in agent runtime (all p ≥ 0.16).',
  },
  {
    label: 'Status',
    bound: 'Peer-reviewed, ACM FSE 2026. Code on GitHub.',
    spy: 'Preprint, arXiv 2610.06001.',
  },
];

function MobileCell({ pillar, text }: { pillar: Pillar; text: string }) {
  return (
    <div className={cn('border-l-2 pl-3', pillar === 'bound' ? 'border-bound/50' : 'border-spy/50')}>
      <div
        className={cn(
          'mb-0.5 inline-flex items-center gap-1 text-xs font-semibold',
          pillar === 'bound' ? 'text-bound' : 'text-spy'
        )}
      >
        <PillarIcon pillar={pillar} className="h-3.5 w-3.5" />
        {pillarMeta[pillar].name}
      </div>
      <p className="text-sm leading-relaxed text-foreground/85">{text}</p>
    </div>
  );
}

export function ComparisonTable({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* Desktop: a two-column table */}
      <div className="hidden overflow-hidden rounded-2xl border bg-card md:block">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <caption className="sr-only">AgentBound and AgentSpy compared</caption>
          <colgroup>
            <col className="w-36" />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="border-b bg-muted/50">
              <th scope="col" className="p-4">
                <span className="sr-only">Dimension</span>
              </th>
              <th scope="col" className="p-4">
                <PillarBadge pillar="bound" />
              </th>
              <th scope="col" className="p-4">
                <PillarBadge pillar="spy" />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b align-top last:border-b-0">
                <th scope="row" className="p-4 font-semibold">
                  {row.label}
                </th>
                <td className="border-l border-bound/20 p-4 leading-relaxed text-foreground/85">{row.bound}</td>
                <td className="border-l border-spy/20 p-4 leading-relaxed text-foreground/85">{row.spy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one block per dimension, both systems stacked */}
      <dl className="divide-y rounded-2xl border bg-card px-4 md:hidden">
        {rows.map((row) => (
          <div key={row.label} className="py-4">
            <dt className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{row.label}</dt>
            <dd className="space-y-3">
              <MobileCell pillar="bound" text={row.bound} />
              <MobileCell pillar="spy" text={row.spy} />
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-muted-foreground">
        Sources: AgentBound §2.3, §3, §4.3, §5; AgentSpy §2.3, §3.3 to §3.6, §4.4.
      </p>
    </div>
  );
}
