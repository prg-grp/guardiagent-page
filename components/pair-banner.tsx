import { PillarBadge } from '@/components/pillar-badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const copy = {
  agentbound: {
    pillar: 'spy' as const,
    title: 'Pairs with AgentSpy',
    body: 'AgentBound blocks what an MCP server was never granted, but it cannot see what the rest of the agent does, and it has no notion of what a run should do. AgentSpy records the system calls and network traffic of the agent and every process it starts, and checks both.',
    href: '/research/agentspy',
    cta: 'Read about AgentSpy',
  },
  agentspy: {
    pillar: 'bound' as const,
    title: 'Pairs with AgentBound',
    body: 'AgentSpy observes and alerts; by design it blocks nothing. AgentBound enforces least privilege on MCP servers at runtime, so an access outside the manifest, and every step that depends on it, never happens.',
    href: '/research/agentbound',
    cta: 'Read about AgentBound',
  },
};

export function PairBanner({ from }: { from: 'agentbound' | 'agentspy' }) {
  const c = copy[from];
  return (
    <div className="flex flex-col gap-6 rounded-2xl border bg-linear-to-br from-bound/5 to-spy/5 p-6 md:flex-row md:items-center md:p-8">
      <div className="flex-1">
        <PillarBadge pillar={c.pillar} className="mb-3" />
        <h2 className="mb-2 text-2xl font-bold">{c.title}</h2>
        <p className="leading-relaxed text-muted-foreground">{c.body}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
        <Button asChild className="w-full">
          <Link href={c.href}>
            {c.cta}
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/approach">Compare AgentBound and AgentSpy</Link>
        </Button>
      </div>
    </div>
  );
}
