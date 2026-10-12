import { cn } from '@/lib/utils';
import { CircleOff } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

const linkClass = 'font-medium text-foreground underline underline-offset-4 hover:text-primary';

// AgentBound §4.2, §5; AgentSpy §4.3, §4.5; incident log entry openai-dns-channel.
const gaps: React.ReactNode[] = [
  <>
    Misuse that stays inside the granted permissions, such as AgentBound attacks B.2 and B.4 or the S5 backdoor that
    AgentSpy missed.
  </>,
  <>Deceptive text: neither system analyzes what an agent says.</>,
  <>A flaw in the isolation layer: AgentBound places Docker and the Linux kernel in its trusted computing base (§5).</>,
  <>
    DNS through permitted resolvers: AgentBound keeps them open and AgentSpy evaluates no DNS rule (see the{' '}
    <Link href="/incidents#openai-dns-channel" className={linkClass}>
      DNS channel case
    </Link>
    ).
  </>,
  <>Monitoring in production: AgentSpy was evaluated on audit runs with one harness (codex CLI).</>,
];

export function Gaps({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto max-w-3xl', className)}>
      <ul className="divide-y rounded-2xl border border-dashed border-muted-foreground/40 bg-background px-5 md:px-6">
        {gaps.map((gap, i) => (
          <li key={i} className="flex gap-3 py-4 text-sm leading-relaxed md:text-base">
            <CircleOff className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <span className="text-foreground/85">{gap}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
        Other controls stay necessary alongside both: human approval for irreversible actions, narrow short-lived
        credentials, trajectory and reasoning monitors, and egress allow lists at the perimeter, DNS included.
      </p>
    </div>
  );
}
