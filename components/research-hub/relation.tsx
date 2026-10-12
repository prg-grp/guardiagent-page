import { PillarIcon, type Pillar } from '@/components/pillar-badge';

// Paraphrased from the paper texts; each statement names the paper that makes it.
const statements: { pillar: Pillar; text: string }[] = [
  {
    pillar: 'spy',
    text: 'AgentSpy cites AgentBound among the approaches that enforce a policy before an agent action executes (AgentSpy §5).',
  },
  {
    pillar: 'spy',
    text: 'AgentSpy calls coding-agent sandboxes complementary to its security analysis: a sandbox blocks an action that crosses its boundary, while AgentSpy lets the run finish in an isolated environment and raises an alert for each step that matches a rule (AgentSpy §3.5.1).',
  },
  {
    pillar: 'bound',
    text: 'AgentBound states that access control cannot prevent attacks that stay within the enforced policy, and suggests combining access control with approaches such as anomaly detection or program analysis (AgentBound §2.3, §5).',
  },
];

export function PaperRelation() {
  return (
    <ul className="max-w-3xl space-y-5">
      {statements.map((s) => (
        <li key={s.text.slice(0, 40)} className="flex gap-3">
          <PillarIcon pillar={s.pillar} className="mt-1 h-5 w-5 shrink-0" />
          <p className="leading-relaxed text-foreground/85 md:text-lg">{s.text}</p>
        </li>
      ))}
    </ul>
  );
}
