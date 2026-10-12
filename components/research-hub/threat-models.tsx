import { PillarBadge, PillarIcon, pillarMeta, type Pillar } from '@/components/pillar-badge';
import { cn } from '@/lib/utils';

type Row = { label: string; bound: string; spy: string };

// Condensed from AgentBound §2.3, §3.1-3.2, §5 and AgentSpy §3.5, §3.5.1, §4.3.
const rows: Row[] = [
  {
    label: 'Adversary',
    bound: 'One or more malicious MCP servers (§2.3).',
    spy: 'A malicious skill, or a modified existing one (§3.5).',
  },
  {
    label: 'Assumed',
    bound: 'The agent behaves as intended; Docker and the Linux kernel are trusted (§2.3, §5).',
    spy: 'The host operating system, the agent SDK and the agent are benign (§3.5).',
  },
  {
    label: 'In scope',
    bound: 'Attacks that make a server access the filesystem, the network or OS interfaces (§2.3).',
    spy: 'Exfiltration of sensitive data, unauthorized changes or destruction of resources, and disruption of the host (§3.5).',
  },
  {
    label: 'Not covered',
    bound: "Attacks that stay within the enforced policy, and attacks on the LLM's reasoning or output alone (§2.3).",
    spy: 'Harm that stays inside the workspace, unless a task-specific rule covers it (§4.3).',
  },
  {
    label: 'On a violation',
    bound: 'Access is blocked; a runtime permission outside the manifest aborts the run (§3.1-3.2).',
    spy: 'An alert names the rule and the process; nothing is blocked (§3.5.1).',
  },
];

// Visible on phones, where the columns stack; read by screen readers at every width.
function CellLabel({ pillar }: { pillar: Pillar }) {
  return (
    <span
      className={cn(
        'mb-1 flex items-center gap-1.5 text-xs font-semibold md:sr-only',
        pillar === 'bound' ? 'text-bound' : 'text-spy'
      )}
    >
      <PillarIcon pillar={pillar} className="h-3.5 w-3.5" />
      {pillarMeta[pillar].name}
      {pillar === 'spy' && <span className="font-normal text-muted-foreground">(security analysis)</span>}
    </span>
  );
}

export function ThreatModels() {
  return (
    <div>
      <div className="hidden gap-6 border-b pb-3 md:grid md:grid-cols-[8rem_1fr_1fr]" aria-hidden>
        <span />
        <PillarBadge pillar="bound" showMode={false} className="justify-self-start" />
        <span className="flex items-center gap-2">
          <PillarBadge pillar="spy" showMode={false} />
          <span className="text-xs text-muted-foreground">security analysis</span>
        </span>
      </div>
      <dl className="divide-y">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-3 py-4 md:grid-cols-[8rem_1fr_1fr] md:gap-6">
            <dt className="text-sm font-semibold text-foreground">{row.label}</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">
              <CellLabel pillar="bound" />
              {row.bound}
            </dd>
            <dd className="text-sm leading-relaxed text-muted-foreground">
              <CellLabel pillar="spy" />
              {row.spy}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t pt-4 text-sm leading-relaxed text-muted-foreground">
        The reliability analysis of AgentSpy has no attacker: it checks whether runs follow the guidance that comes
        with the task and agree with each other (§3.3).
      </p>
    </div>
  );
}
