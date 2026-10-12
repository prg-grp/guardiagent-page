import { IncidentExplorer } from '@/components/incidents/incident-explorer';
import { IncidentLegend } from '@/components/incidents/legend';
import { OpenGaps } from '@/components/incidents/open-gaps';
import { LabFixesTable } from '@/components/lab-fixes-table';
import { PageHero } from '@/components/page-hero';
import { Section, SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { incidentsLastReviewed } from '@/lib/incidents';
import { ArrowDown } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Incidents',
  description:
    'A curated log of publicly disclosed AI agent incidents, each with its setting and sources, mapped to the boundary it crossed.',
  alternates: { canonical: '/incidents' },
};

export default function IncidentsPage() {
  return (
    <>
      <PageHero
        title="Agent incidents, mapped to the boundary they crossed"
        description={
          <p>A curated log of publicly disclosed cases. Each entry names its setting and links its sources.</p>
        }
      >
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <Link href="#log">
              Browse the log
              <ArrowDown aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white dark:border-white/25 dark:bg-white/5 dark:hover:bg-white/15"
          >
            <Link href="/approach">See the approach</Link>
          </Button>
        </div>
      </PageHero>

      <Section id="log">
        <SectionHeader
          align="left"
          title="Incident log"
          description={`Newest first, last reviewed ${incidentsLastReviewed}. Summaries are in our own words; open a card for the notes behind its ratings.`}
          className="mb-8 max-w-3xl md:mb-10"
        />
        <IncidentLegend />
        <IncidentExplorer />
      </Section>

      <Section id="lab-fixes" tone="muted">
        <SectionHeader
          align="left"
          title="Fixes the labs announced"
          description="Changes each lab or evaluator announced after a disclosure, sorted by layer. None of them involves AgentBound or AgentSpy."
          className="mb-8 max-w-3xl md:mb-10"
        />
        <LabFixesTable />
      </Section>

      <Section id="open-gaps" tone="dark">
        <SectionHeader
          align="left"
          dark
          title="Gaps neither layer closes"
          description="Some incidents fall outside both layers, or only partly inside them. The papers name several of these limits themselves."
          className="mb-8 max-w-3xl md:mb-10"
        />
        <OpenGaps />
      </Section>

      <Section id="method" className="py-16 md:py-20">
        <div className="max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-balance md:text-3xl">Method and corrections</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We include a case when the lab, the evaluator or the affected party disclosed it, or when named researchers
            documented it; for lab-disclosed cases the first link is a primary report. Where a production case rests on
            press coverage or a user&apos;s account, the card says who reported it or adds a caveat. The ratings are our
            reading of each source against the threat models and evaluations in the papers. To correct an entry, write to{' '}
            <a
              href="mailto:info@guardiagent.com"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              info@guardiagent.com
            </a>{' '}
            with a source.
          </p>
        </div>
      </Section>
    </>
  );
}
