import { PillarBadge } from '@/components/pillar-badge';
import { Stat } from '@/components/stat';
import { Button } from '@/components/ui/button';
import { authorLine, type Paper } from '@/lib/papers';
import { cn } from '@/lib/utils';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function PaperCard({
  paper,
  statCount = 3,
  className,
}: {
  paper: Paper;
  statCount?: number;
  className?: string;
}) {
  const pillar = paper.id === 'agentbound' ? 'bound' : 'spy';
  const stats = (paper.stats.some((s) => s.highlight) ? paper.stats.filter((s) => s.highlight) : paper.stats).slice(
    0,
    statCount
  );
  return (
    <article
      className={cn(
        '@container flex flex-col rounded-2xl border-2 bg-card p-6 shadow-sm md:p-8',
        pillar === 'bound' ? 'border-bound/30' : 'border-spy/30',
        className
      )}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <PillarBadge pillar={pillar} />
        <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          {[paper.status, paper.venueShort, paper.codeStatus].filter(Boolean).join(' · ')}
        </span>
      </div>
      <h3 className="mb-2 text-2xl font-bold">{paper.name}</h3>
      <p className="mb-1 text-sm font-medium text-foreground/80">{paper.title}</p>
      <p className="mb-4 text-xs text-muted-foreground">{authorLine}</p>
      <p className="mb-6 leading-relaxed text-muted-foreground">{paper.thesis}</p>
      {stats.length > 0 && (
        <div className={cn('mb-8 grid gap-6', stats.length === 2 ? '@md:grid-cols-2' : '@md:grid-cols-3')}>
          {stats.map((s) => (
            <Stat key={s.label} stat={s} tone={pillar} />
          ))}
        </div>
      )}
      <div className="mt-auto flex flex-wrap gap-3">
        <Button
          asChild
          className={cn('text-white', pillar === 'bound' ? 'bg-bound hover:bg-bound/90' : 'bg-spy hover:bg-spy/90')}
        >
          <Link href={paper.href}>
            <BookOpen className="mr-1 h-4 w-4" aria-hidden />
            Paper page
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a href={paper.links[0].href} target="_blank" rel="noopener noreferrer">
            {paper.links[0].label}
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
          </a>
        </Button>
      </div>
    </article>
  );
}
