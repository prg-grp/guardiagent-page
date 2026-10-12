import { Pipeline } from '@/components/agentspy/pipeline';
import { AgentSpyResults } from '@/components/agentspy/results';
import { AgentSpySimulator } from '@/components/agentspy/simulator';
import { TrajectoryVsSyscalls } from '@/components/agentspy/trajectory-vs-syscalls';
import { CitationBlock } from '@/components/citation-block';
import { PageHero } from '@/components/page-hero';
import { PairBanner } from '@/components/pair-banner';
import { PillarBadge } from '@/components/pillar-badge';
import { Section, SectionHeader } from '@/components/section-header';
import { Stat } from '@/components/stat';
import { Button } from '@/components/ui/button';
import { agentSpy, authorLine, citationMeta, type PaperStat } from '@/lib/papers';
import { cn } from '@/lib/utils';
import { ArrowDown, ChevronDown, ExternalLink, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AgentSpy',
  description:
    'AgentSpy (arXiv:2610.06001) runs an AI agent in a Firecracker microVM and records the system calls and network traffic of the agent and every process it starts. Deterministic analyses check what a run should do and what it must never do.',
  alternates: { canonical: '/research/agentspy' },
  other: citationMeta(agentSpy),
};

const stats = ['92.2%', '18%', '14 / 18', 'p ≥ 0.16']
  .map((value) => agentSpy.stats.find((s) => s.value === value))
  .filter((s): s is PaperStat => s !== undefined);

const analyses = [
  {
    family: 'Conformance · obligations',
    tone: 'text-spy',
    title: 'Reliability analysis',
    body: 'Builds a star graph per run from the commands, files and hosts it used, with counts. Similarity compares runs resource by resource (1 for the same resources in the same proportions, 0 for none in common), and skill coverage is the share of a skill\'s files a run used.',
  },
  {
    family: 'Safety · prohibitions',
    tone: 'text-alert',
    title: 'Security analysis',
    body: 'Checks rules over single system calls: reads of credentials, changes outside the workspace, untrusted programs or privilege changes, and connections to hosts off the task\'s allow list. Each alert names the rule, the system call and the process; nothing is blocked.',
  },
];


const heroButton = 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white';

export default function AgentSpyPage() {
  return (
    <>
      <PageHero
        eyebrow={<PillarBadge pillar="spy" variant="dark" />}
        title={agentSpy.title}
        description={
          <p>
            AgentSpy runs an AI agent in a disposable Firecracker microVM and records the system calls and network
            traffic of the agent and every process it starts. Deterministic analyses then check what a run should do and
            what it must never do, before the agent and its skills are trusted with real work.
          </p>
        }
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-spy text-white hover:bg-spy/90">
            <a href="https://arxiv.org/abs/2610.06001" target="_blank" rel="noopener noreferrer">
              <ExternalLink aria-hidden />
              Read the paper
            </a>
          </Button>
          <Button asChild variant="outline" className={heroButton}>
            <Link href="#simulator">
              <ArrowDown aria-hidden />
              See a report
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-slate-400">
          {authorLine} · Preprint, {agentSpy.date}
        </p>
      </PageHero>

      <Section id="summary" className="py-12 md:py-16">
        <h2 className="sr-only">Key numbers</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.value} stat={s} tone="spy" />
          ))}
        </div>
      </Section>

      <Section id="simulator" tone="muted">
        <SectionHeader
          title="See a report"
          description="Pick a model and a SkillsBench task to replay three recorded runs from the paper's experiments as a reliability report."
          align="left"
          className="mb-8 md:mb-10"
        />
        <AgentSpySimulator />
      </Section>

      <Section id="example" tone="dark">
        <SectionHeader
          dark
          title="A skill injection in the trajectory and at the system boundary"
          description="One line added to a skill makes the agent run a script that uploads the agent user's private SSH keys, then runs the validation the task expects. The trajectory, the agent's own record, shows a single command."
          align="left"
          className="mb-8 md:mb-10"
        />
        <TrajectoryVsSyscalls />
      </Section>

      <Section id="approach">
        <SectionHeader
          title="From a microVM run to a report"
          description="Each run happens in a fresh microVM, and deterministic analyses with no LLM involved read the records copied out afterwards."
          align="left"
          className="mb-8 md:mb-10"
        />
        <Pipeline />
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {analyses.map((a) => (
            <div key={a.title} className="border-t pt-4">
              <div className={cn('mb-1 text-xs font-semibold tracking-wide uppercase', a.tone)}>{a.family}</div>
              <h3 className="mb-1.5 text-lg font-semibold">{a.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="results" tone="muted">
        <SectionHeader
          title="Results"
          description={
            <>
              Reliability was evaluated on 77 SkillsBench tasks with{' '}
              <span className="whitespace-nowrap">gpt-5.6-terra</span>,{' '}
              <span className="whitespace-nowrap">deepseek-v4-flash</span> and{' '}
              <span className="whitespace-nowrap">glm-5.3-flash</span>, security on Skill-Inject with{' '}
              <span className="whitespace-nowrap">gpt-5.1-codex-max</span>, all under codex CLI 0.146.0.
            </>
          }
          align="left"
          className="mb-8 md:mb-10"
        />
        <AgentSpyResults />
      </Section>

      <Section id="pairs-with">
        <PairBanner from="agentspy" />
      </Section>

      <Section id="cite" tone="muted">
        <h2 className="mb-3 text-3xl font-bold md:text-4xl">Cite AgentSpy</h2>
        <p className="mb-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {agentSpy.status}, {agentSpy.venue}, {agentSpy.date}.
        </p>
        <details className="group max-w-4xl rounded-xl border bg-background">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            BibTeX
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <div className="border-t p-3 md:p-4">
            <CitationBlock bibtex={agentSpy.bibtex} />
          </div>
        </details>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <a href="https://arxiv.org/abs/2610.06001" target="_blank" rel="noopener noreferrer">
              <ExternalLink aria-hidden />
              arXiv
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#contact">
              <Mail aria-hidden />
              Contact the authors
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
