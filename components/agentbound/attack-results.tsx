import { attackGroups, type AttackCase, type AttackOutcome } from '@/components/agentbound/data';
import { cn } from '@/lib/utils';
import { Ban, LockOpen, Split, TriangleAlert } from 'lucide-react';
import type React from 'react';

const outcomeMeta: Record<AttackOutcome, { label: string; icon: React.ElementType; tone: string }> = {
  blocked: {
    label: 'Blocked',
    icon: Ban,
    tone: 'border-destructive/30 bg-destructive/5 text-destructive',
  },
  depends: {
    label: 'Depends on vector',
    icon: Split,
    tone: 'border-dashed border-destructive/40 bg-background text-destructive',
  },
  'not-blocked': {
    label: 'Not blocked',
    icon: TriangleAlert,
    tone: 'border-border bg-muted text-foreground',
  },
  baseline: {
    label: 'Key exfiltrated',
    icon: LockOpen,
    tone: 'border-border bg-muted text-muted-foreground',
  },
};

function OutcomeBadge({ outcome }: { outcome: AttackOutcome }) {
  const meta = outcomeMeta[outcome];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap',
        meta.tone
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {meta.label}
    </span>
  );
}

function caseTitle(c: AttackCase) {
  return c.target ? (
    <>
      <span className="font-medium text-foreground">{c.target}</span>
      <span className="block text-xs text-muted-foreground">{c.type}</span>
    </>
  ) : (
    <span className="text-foreground">{c.type}</span>
  );
}

// Public-dataset attacks only (B and C). C.10 is counted as prevented, as in the paper.
export function attackTotals() {
  const cases = attackGroups.filter((g) => g.key !== 'A').flatMap((g) => g.cases);
  const blocked = cases.filter((c) => c.outcome === 'blocked' || c.outcome === 'depends');
  const notBlocked = cases.filter((c) => c.outcome === 'not-blocked');
  return { total: cases.length, blocked, notBlocked };
}

// All attack cases of §4.2 (Fig. 5), grouped by source. Rendered inside a disclosure, so the groups share one frame.
export function AttackResults() {
  return (
    <div>
      {attackGroups.map((group) => (
        <div key={group.key}>
          <div className="border-y bg-muted/40 px-4 py-3 md:px-6">
            <h4 className="font-semibold">
              <span className="mr-2 font-mono text-sm text-bound">{group.key}</span>
              {group.title}
            </h4>
            <p className="text-sm text-muted-foreground">{group.note}</p>
          </div>

          {/* Desktop: table. Fixed column widths keep the three tables aligned with each other. */}
          <table className="hidden w-full table-fixed text-left text-sm md:table">
            <colgroup>
              <col className="w-20" />
              <col className="w-44 lg:w-56" />
              <col className="w-44" />
              <col />
            </colgroup>
            <thead className="sr-only">
              <tr>
                <th scope="col">Case</th>
                <th scope="col">Server and attack type</th>
                <th scope="col">Outcome</th>
                <th scope="col">Reason given in the paper</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {group.cases.map((c) => (
                <tr key={c.id} className="align-top">
                  <th scope="row" className="px-6 py-3 font-mono text-sm font-semibold">
                    {c.id}
                  </th>
                  <td className="py-3 pr-4">{caseTitle(c)}</td>
                  <td className="py-3 pr-4">
                    <OutcomeBadge outcome={c.outcome} />
                  </td>
                  <td className="py-3 pr-6 leading-relaxed text-muted-foreground">{c.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile: stacked list */}
          <ul className="divide-y md:hidden">
            {group.cases.map((c) => (
              <li key={c.id} className="space-y-2 px-4 py-3 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <span className="font-mono font-semibold">{c.id}</span>
                    <div className="min-w-0">{caseTitle(c)}</div>
                  </div>
                  <OutcomeBadge outcome={c.outcome} />
                </div>
                <p className="leading-relaxed text-muted-foreground">{c.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
