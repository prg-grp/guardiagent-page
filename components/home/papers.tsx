import { PaperCard } from '@/components/paper-card';
import { Section, SectionHeader } from '@/components/section-header';
import { papers } from '@/lib/papers';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Papers() {
  return (
    <Section id="research" tone="muted">
      <SectionHeader title="Our papers on bounding and observing AI agents" />

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {papers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} statCount={2} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/approach#publications"
          className="group inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
        >
          Publications and citations
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
