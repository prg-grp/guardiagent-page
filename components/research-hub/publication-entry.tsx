import { CitationBlock } from '@/components/citation-block';
import { PillarBadge } from '@/components/pillar-badge';
import { Button } from '@/components/ui/button';
import { authorLine, type Paper } from '@/lib/papers';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown, ExternalLink, Quote } from 'lucide-react';
import Link from 'next/link';

export function PublicationEntry({ paper }: { paper: Paper }) {
  const pillar = paper.id === 'agentbound' ? 'bound' : 'spy';
  // A preprint has no short venue yet, so it shows its arXiv identifier instead.
  const venue = paper.status === 'Peer-reviewed' ? paper.venueShort : paper.venue;
  const meta = [`${paper.status}, ${venue}`, paper.date, paper.codeStatus].filter((m): m is string => Boolean(m));

  return (
    <article
      id={paper.id}
      aria-labelledby={`${paper.id}-title`}
      className={cn(
        'flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-t-4 bg-card shadow-sm',
        pillar === 'bound' ? 'border-t-bound' : 'border-t-spy'
      )}
    >
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <PillarBadge pillar={pillar} className="mb-4 self-start" />
        <h3 id={`${paper.id}-title`} className="mb-3 text-2xl leading-tight font-bold text-balance">
          {paper.title}
        </h3>
        <p className="mb-1 text-sm text-foreground/80">{authorLine}</p>
        <p className="mb-5 text-sm text-muted-foreground">{meta.join(' · ')}</p>
        <p className="mb-6 leading-relaxed text-muted-foreground">{paper.oneLiner}</p>

        <div className="mt-auto space-y-4">
          <Button
            asChild
            className={cn('text-white', pillar === 'bound' ? 'bg-bound hover:bg-bound/90' : 'bg-spy hover:bg-spy/90')}
          >
            <Link href={paper.href}>
              {paper.name} paper page
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label={`${paper.name} links`}>
            {paper.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <details className="group border-t bg-muted/40">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-4 text-sm font-semibold transition-colors hover:bg-muted/60 md:px-8 [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <Quote className="h-4 w-4 text-muted-foreground" aria-hidden />
            Cite this paper
          </span>
          <ChevronDown
            className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div className="px-6 pb-6 md:px-8">
          <CitationBlock bibtex={paper.bibtex} />
        </div>
      </details>
    </article>
  );
}
