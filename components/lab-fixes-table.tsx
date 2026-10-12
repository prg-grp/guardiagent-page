import { PillarBadge } from '@/components/pillar-badge';
import { labFixes } from '@/lib/incidents';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// What the labs announced after each disclosure, sorted into the two layers. These are their fixes, not ours.
export function LabFixesTable({ limit, className }: { limit?: number; className?: string }) {
  const rows = limit ? labFixes.slice(0, limit) : labFixes;
  return (
    <div className={cn('overflow-hidden rounded-2xl border bg-card', className)}>
      <div className="hidden grid-cols-[1.1fr_1fr_1fr] gap-4 border-b bg-muted/60 px-5 py-3 text-sm font-semibold md:grid">
        <span>Disclosure</span>
        <span className="flex items-center gap-2">
          <PillarBadge pillar="bound" showName={false} /> Boundary fixes they announced
        </span>
        <span className="flex items-center gap-2">
          <PillarBadge pillar="spy" showName={false} /> Observation fixes they announced
        </span>
      </div>
      <ul className="divide-y">
        {rows.map((r) => (
          <li key={r.id} className="grid gap-3 px-5 py-4 text-sm md:grid-cols-[1.1fr_1fr_1fr] md:gap-4">
            <div>
              <Link href={`/incidents#${r.id}`} className="font-semibold hover:text-primary hover:underline">
                {r.org}
              </Link>
              <p className="text-muted-foreground">{r.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">Disclosed {r.disclosed}</p>
            </div>
            <div>
              <span className="mb-1 block md:hidden">
                <PillarBadge pillar="bound" showName={false} />
              </span>
              {r.bound ?? <span className="text-muted-foreground">None announced</span>}
            </div>
            <div>
              <span className="mb-1 block md:hidden">
                <PillarBadge pillar="spy" showName={false} />
              </span>
              {r.observe ?? <span className="text-muted-foreground">None announced</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
