import { getIncident } from '@/components/incidents/data';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';

// Limits outside both layers, each with an entry in the log that shows it in practice.
// `example.label` is a short name for the linked entry; getIncident fails the build if the id disappears.
type OpenGap = { id: string; title: string; body: string; example: { id: string; label: string } };

const openGaps: OpenGap[] = [
  {
    id: 'gap-in-policy',
    title: 'Misuse inside the permitted scope',
    body: 'A permitted call can still do harm, such as hiding a copy of data in a request to an allowed host; the AgentBound paper names this limit (attack B.2).',
    example: { id: 'postmark-mcp', label: 'Malicious Postmark MCP package' },
  },
  {
    id: 'gap-deceptive-text',
    title: 'Deceptive or coercive text',
    body: 'Neither layer judges whether a message deceives or coerces its reader.',
    example: { id: 'agentic-misalignment-2025', label: 'Simulated insider-threat scenarios' },
  },
  {
    id: 'gap-workspace',
    title: 'Harm that stays inside the workspace',
    body: 'All four misses in the AgentSpy evaluation were runs of one backdoor case (S5), a Git remote added but never pushed to; catching it would need a task-specific rule.',
    example: { id: 'skill-inject', label: 'Skill-Inject benchmark' },
  },
  {
    id: 'gap-dns',
    title: 'Covert channels through permitted resolvers',
    body: 'Lookups through a configured DNS resolver stay open in the AgentBound prototype, and the AgentSpy paper evaluates no DNS-specific rule.',
    example: { id: 'openai-dns-channel', label: 'DNS tunnel from an OpenAI RL sandbox' },
  },
  {
    id: 'gap-isolation',
    title: 'Flaws in the isolation layer',
    body: 'Enforcement depends on the isolation underneath: the AgentBound paper places Docker and the Linux kernel in its trusted computing base.',
    example: { id: 'hugging-face-intrusion', label: 'Sandbox escape and Hugging Face breach' },
  },
];

export function OpenGaps() {
  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {openGaps.map((gap) => {
        const incident = getIncident(gap.example.id);
        return (
          <li
            key={gap.id}
            id={gap.id}
            className="grid scroll-mt-24 gap-2 py-5 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10"
          >
            <h3 className="font-semibold text-white">{gap.title}</h3>
            <div className="text-sm leading-relaxed text-slate-300 md:text-base">
              <p>{gap.body}</p>
              <Link
                href={`/incidents#${incident.id}`}
                className="mt-1 inline-flex items-start gap-1 text-sm font-medium text-slate-100 underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                <ArrowUp className="mt-[0.2em] h-3.5 w-3.5 shrink-0" aria-hidden />
                In the log: {gap.example.label}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
