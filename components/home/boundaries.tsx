import { Section, SectionHeader } from '@/components/section-header';
import {
  diagramCaption,
  TwoBoundariesDiagram,
  TwoBoundariesLegend,
  TwoBoundariesStacked,
} from '@/components/two-boundaries-diagram';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Boundaries() {
  return (
    <Section id="vision">
      <SectionHeader
        title="The tool boundary and the OS boundary"
        description={
          <p>
            AgentBound blocks an MCP server&apos;s undeclared access before the action runs, but does not cover the
            agent&apos;s own shell. AgentSpy records every process the agent starts, but blocks nothing and alerts after
            the run.
          </p>
        }
      />

      <figure className="rounded-2xl border bg-card p-4 shadow-sm md:p-8">
        <TwoBoundariesDiagram className="hidden md:block" />
        <TwoBoundariesStacked className="md:hidden" />
        <TwoBoundariesLegend className="mt-6 hidden md:grid" />
        <figcaption className="mt-4 border-t pt-4 text-sm leading-relaxed text-muted-foreground">
          {diagramCaption}
        </figcaption>
      </figure>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg" className="bg-background">
          <Link href="/approach">
            Full comparison
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
