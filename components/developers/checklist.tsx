import { InlineCode } from '@/components/developers/doc-link';
import { pillarMeta, type Pillar } from '@/components/pillar-badge';
import { agentBound, agentSpy, type Paper } from '@/lib/papers';
import { cn } from '@/lib/utils';
import type React from 'react';

const stat = (paper: Paper, needle: string, fallback: string) =>
  paper.stats.find((s) => s.label.includes(needle))?.value ?? fallback;

const networkShare = stat(agentBound, 'outbound network access', '83.1%');
const serverCount = stat(agentBound, 'MCP servers analyzed', '296');
const detected = stat(agentSpy, 'skill-injection attacks flagged', '14 / 18').replace(' / ', ' of ');
const hiddenConnections = stat(agentSpy, 'Crossref connections', '35');

const code = 'bg-white/10';

type Item = { title: string; body: React.ReactNode; pillar: Pillar; refs: string };

const items: Item[] = [
  {
    title: 'Deny egress by default',
    body: (
      <>
        Leave <InlineCode className={code}>ALLOWED_EGRESS</InlineCode> empty and grant network permissions only to the
        servers that need them. Expect to write such lists: {networkShare} of {serverCount} popular MCP servers needed
        outbound access.
      </>
    ),
    pillar: 'bound',
    refs: '§3.3, §4.1.2',
  },
  {
    title: 'Keep credentials out of reach',
    body: (
      <>
        Grant single variables with <InlineCode className={code}>EnvironmentVariable</InlineCode> and never mount{' '}
        <InlineCode className={code}>~/.ssh</InlineCode> or a home directory. In the paper&apos;s SSH-key test, the full
        sandbox kept the key unreadable.
      </>
    ),
    pillar: 'bound',
    refs: '§4.2, attacks A.1 to A.3',
  },
  {
    title: 'Prefer read-only mounts',
    body: (
      <>
        Keep <InlineCode className={code}>FSAccess</InlineCode> at <InlineCode className={code}>write=False</InlineCode>{' '}
        unless the server has to write. A read-write mount also allows deletion.
      </>
    ),
    pillar: 'bound',
    refs: '§3.1, §3.3',
  },
  {
    title: 'Audit untrusted skills before production',
    body: `Run the agent with the skill several times in a disposable VM and check the system calls of the agent and every process it starts. In the AgentSpy paper, deterministic rules flagged ${detected} executed skill-injection attacks and raised no alert in the 32 runs without executed injected behavior.`,
    pillar: 'spy',
    refs: '§3.5.1, §4.3',
  },
  {
    title: 'Do not rely on the trajectory alone',
    body: `The trajectory, the agent's own record, has one entry per action: in the AgentSpy running example, a single step hid ${hiddenConnections} connections to Crossref. Keep system call and network records for agents with real access.`,
    pillar: 'spy',
    refs: '§3.4.1',
  },
];

export function Checklist() {
  return (
    <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {items.map((item, i) => {
        const meta = pillarMeta[item.pillar];
        const Icon = meta.icon;
        return (
          <li
            key={item.title}
            className={cn(
              'flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6',
              i === items.length - 1 && 'md:col-span-2'
            )}
          >
            <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mb-4 leading-relaxed text-slate-300">{item.body}</p>
            <p className="mt-auto inline-flex items-center gap-1.5 text-xs text-slate-400">
              <Icon
                className={cn('h-3.5 w-3.5 shrink-0', item.pillar === 'spy' ? 'text-spy-soft' : 'text-bound-soft')}
                aria-hidden
              />
              {meta.name}, {item.refs}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
