import { ComparisonTable } from '@/components/approach/comparison-table';
import { Gaps } from '@/components/approach/gaps';
import { SingleLayerLimits } from '@/components/approach/single-layer-limits';
import { PageHero } from '@/components/page-hero';
import { Directions } from '@/components/research-hub/directions';
import { Disclosure } from '@/components/research-hub/disclosure';
import { PublicationEntry } from '@/components/research-hub/publication-entry';
import { PaperRelation } from '@/components/research-hub/relation';
import { ThreatModels } from '@/components/research-hub/threat-models';
import { Section, SectionHeader } from '@/components/section-header';
import { TwoBoundariesLegend, diagramCaption } from '@/components/two-boundaries-diagram';
import { TwoBoundariesInteractive } from '@/components/two-boundaries-interactive';
import { agentBound, agentSpy } from '@/lib/papers';
import { cn } from '@/lib/utils';
import { ArrowRight, Code2, FlaskConical, ScanEye, Shield } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Approach',
  description:
    'AgentBound (ACM FSE 2026) enforces least privilege for MCP servers at the tool boundary; AgentSpy (arXiv 2610.06001) records what an agent and its processes did at the OS boundary. Publications, comparison and the gaps that remain.',
};

// Newest first.
const publications = [agentSpy, agentBound];

type NextLink = {
  href: string;
  title: string;
  body: string;
  icon: React.ElementType;
  tone: 'bound' | 'spy' | 'neutral';
};

const nextLinks: NextLink[] = [
  { href: agentBound.href, title: 'AgentBound paper', body: agentBound.oneLiner, icon: Shield, tone: 'bound' },
  { href: agentSpy.href, title: 'AgentSpy paper', body: agentSpy.oneLiner, icon: ScanEye, tone: 'spy' },
  {
    href: '/developers',
    title: 'Developer guide',
    body: 'Run an MCP server in the AgentBound sandbox.',
    icon: Code2,
    tone: 'neutral',
  },
];

const nextTone = {
  bound: 'border-bound-soft/30 hover:border-bound-soft/60 [&_svg]:text-bound-soft',
  spy: 'border-spy-soft/30 hover:border-spy-soft/60 [&_svg]:text-spy-soft',
  neutral: 'border-white/15 hover:border-white/40 [&_svg]:text-slate-300',
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        title="Prevent and observe"
        description="AgentBound enforces least privilege for MCP servers before an action runs. AgentSpy records what an agent and every process it starts did, and checks that record after the run. This page lists both papers, compares them and names the gaps that remain."
      />

      <Section id="publications">
        <SectionHeader align="left" className="mb-8 md:mb-10" title="Publications" />
        <div className="grid gap-6 lg:grid-cols-2">
          {publications.map((paper) => (
            <PublicationEntry key={paper.id} paper={paper} />
          ))}
        </div>
      </Section>

      <Section id="paths" tone="muted">
        <SectionHeader
          title="Paths through the tool and OS boundaries"
          description="Each layer acts at a different boundary, and some attacks pass both."
        />
        <TwoBoundariesInteractive />
        <TwoBoundariesLegend className="mt-8 hidden md:grid" />
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{diagramCaption}</p>
      </Section>

      <Section id="comparison">
        <SectionHeader
          title="AgentBound and AgentSpy compared"
          description="Both are research prototypes, built for different threat models and evaluated separately."
        />
        <ComparisonTable />
        <p className="mt-8 flex gap-3 rounded-xl border border-dashed border-muted-foreground/40 bg-background p-4 text-sm leading-relaxed">
          <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <span>
            <span className="font-semibold">Recommended practice, not evaluated in either paper:</span>{' '}
            <span className="text-muted-foreground">
              audit with AgentSpy before deployment and run the MCP servers under AgentBound; audit again when the
              model, the harness or a skill changes.
            </span>
          </span>
        </p>
      </Section>

      <Section id="relation" tone="muted">
        <SectionHeader align="left" className="mb-8 md:mb-10" title="Relation between the papers" />
        <PaperRelation />
        <div className="mt-10 space-y-3">
          <Disclosure summary="Threat models side by side">
            <ThreatModels />
          </Disclosure>
          <Disclosure summary="Directions named in the papers">
            <Directions />
          </Disclosure>
        </div>
      </Section>

      <Section id="limits">
        <SectionHeader
          title="Limits of a single control"
          description="Each control sees part of a run, and these cases show where one layer alone stops."
        />
        <SingleLayerLimits />
      </Section>

      <Section id="gaps" tone="muted">
        <SectionHeader
          title="Gaps neither layer covers"
          description="Both papers name their limits, and these threats pass both layers."
        />
        <Gaps />
      </Section>

      <Section id="next" tone="dark">
        <SectionHeader dark title="Continue with the research" className="mb-10 md:mb-12" />
        <div className="grid gap-4 md:grid-cols-3">
          {nextLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group flex flex-col rounded-2xl border bg-white/5 p-6 transition-colors hover:bg-white/10',
                  nextTone[link.tone]
                )}
              >
                <Icon className="mb-4 h-6 w-6" aria-hidden />
                <h3 className="mb-2 flex items-center gap-1 text-lg font-semibold text-white">
                  {link.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">{link.body}</p>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
