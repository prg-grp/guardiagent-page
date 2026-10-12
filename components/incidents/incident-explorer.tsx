'use client';

import { settingGroups, type SettingGroupId } from '@/components/incidents/data';
import { IncidentLogCard } from '@/components/incidents/incident-log-card';
import { Button } from '@/components/ui/button';
import { boundaryLabels, kindLabels, sortedIncidents, type Boundary, type Incident, type Kind } from '@/lib/incidents';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronsDownUp, ChevronsUpDown, RotateCcw, SearchX } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';

type Filters = { setting: SettingGroupId | 'all'; kind: Kind | 'all'; boundary: Boundary | 'all' };
type FilterKey = keyof Filters;

const defaultFilters: Filters = { setting: 'all', kind: 'all', boundary: 'all' };

// Cards shown before "Show more"; links into the log reveal the full list.
const initialCount = 12;

const allIncidents = sortedIncidents();
const byId = new Map(allIncidents.map((i) => [i.id, i]));

const settingOptions = settingGroups.map((g) => ({ value: g.id, label: g.label }));
const kindOptions = (Object.keys(kindLabels) as Kind[]).map((k) => ({ value: k, label: kindLabels[k] }));
const boundaryOptions = (Object.keys(boundaryLabels) as Boundary[]).map((b) => ({ value: b, label: boundaryLabels[b] }));

function matches(incident: Incident, f: Filters) {
  if (f.setting !== 'all') {
    const group = settingGroups.find((g) => g.id === f.setting);
    if (!group?.settings.includes(incident.setting)) return false;
  }
  if (f.kind !== 'all' && incident.kind !== f.kind) return false;
  if (f.boundary !== 'all' && !incident.boundaries.includes(f.boundary)) return false;
  return true;
}

// Number of incidents an option would show, given the other two filters.
function countFor<K extends FilterKey>(key: K, value: Filters[K], f: Filters) {
  const next = { ...f, [key]: value };
  return allIncidents.filter((i) => matches(i, next)).length;
}

function FilterGroup<K extends FilterKey>({
  filterKey,
  label,
  options,
  filters,
  onChange,
}: {
  filterKey: K;
  label: string;
  options: { value: Filters[K]; label: string }[];
  filters: Filters;
  onChange: (key: K, value: Filters[K]) => void;
}) {
  const labelId = `incident-filter-${filterKey}`;
  const all = [{ value: 'all' as Filters[K], label: 'All' }, ...options];
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-4">
      <span id={labelId} className="text-sm font-semibold md:pt-1.5">
        {label}
      </span>
      {/* One scrollable row per filter on phones, wrapped chips from md up. */}
      <div
        role="group"
        aria-labelledby={labelId}
        className={cn(
          '-mx-5 -my-1 flex min-w-0 gap-2 overflow-x-auto px-5 py-1',
          'md:mx-0 md:my-0 md:flex-wrap md:overflow-visible md:px-0 md:py-0'
        )}
      >
        {all.map((option) => {
          const active = filters[filterKey] === option.value;
          const count = countFor(filterKey, option.value, filters);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(filterKey, option.value)}
              className={cn(
                // relative: keeps the sr-only count text inside the scrolling row on phones.
                'relative inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm',
                'whitespace-nowrap transition-colors outline-none',
                'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                active
                  ? 'border-primary bg-primary font-medium text-primary-foreground'
                  : 'bg-background hover:bg-muted',
                !active && count === 0 && 'text-muted-foreground'
              )}
            >
              {option.label}
              <span
                className={cn(
                  'rounded-full px-1.5 text-xs tabular-nums',
                  active ? 'bg-white/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
              >
                <span className="sr-only">(</span>
                {count}
                <span className="sr-only"> incidents)</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function incidentIdFromHash(hash: string) {
  let id = hash.replace(/^#/, '');
  try {
    id = decodeURIComponent(id);
  } catch {
    return null;
  }
  return byId.has(id) ? id : null;
}

export function IncidentExplorer() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set());
  const [highlight, setHighlight] = useState<{ id: string; at: number } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(() => allIncidents.filter((i) => matches(i, filters)), [filters]);
  const shown = showAll ? visible : visible.slice(0, initialCount);
  const hiddenCount = visible.length - shown.length;
  const isFiltered = filters.setting !== 'all' || filters.kind !== 'all' || filters.boundary !== 'all';
  const allOpen = shown.length > 0 && shown.every((i) => open.has(i.id));

  useEffect(() => {
    // Make a card that a link or the URL points to visible and open, even when the current filters hide it.
    const reveal = (id: string) => {
      const incident = byId.get(id);
      if (!incident) return;
      flushSync(() => {
        setFilters((f) => (matches(incident, f) ? f : defaultFilters));
        setShowAll(true);
        setOpen((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
      });
      setHighlight({ id, at: Date.now() });
    };

    // Same-page links (next/link or plain anchors) to /incidents#<id>. Runs in the capture phase,
    // before the router or the browser scrolls, so the target card exists and is open by then.
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const id = incidentIdFromHash(url.hash);
      if (id) reveal(id);
    };

    const scrollToHash = () => {
      const id = incidentIdFromHash(window.location.hash);
      if (!id) return;
      reveal(id);
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('hashchange', scrollToHash);
    const frame = window.requestAnimationFrame(scrollToHash);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('hashchange', scrollToHash);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!highlight) return;
    const timer = window.setTimeout(() => setHighlight(null), 2400);
    return () => window.clearTimeout(timer);
  }, [highlight]);

  const update = <K extends FilterKey>(key: K, value: Filters[K]) => setFilters((f) => ({ ...f, [key]: value }));
  const reset = () => setFilters(defaultFilters);

  const toggle = (id: string) => {
    const closing = open.has(id);
    flushSync(() =>
      setOpen((prev) => {
        const next = new Set(prev);
        if (closing) next.delete(id);
        else next.add(id);
        return next;
      })
    );
    // Closing a long card can leave its top above the viewport; bring the card back into view.
    const card = closing ? document.getElementById(id) : null;
    if (card && card.getBoundingClientRect().top < 0) card.scrollIntoView({ block: 'start' });
  };

  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(shown.map((i) => i.id)));

  const showMore = () => {
    const firstNew = visible[shown.length];
    flushSync(() => setShowAll(true));
    // The button disappears; move focus to the first card it revealed.
    if (firstNew) document.getElementById(`${firstNew.id}-toggle`)?.focus();
  };

  return (
    <div>
      <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
        <div className="space-y-4">
          <FilterGroup
            filterKey="setting"
            label="Setting"
            options={settingOptions}
            filters={filters}
            onChange={update}
          />
          <FilterGroup filterKey="kind" label="Type" options={kindOptions} filters={filters} onChange={update} />
          <FilterGroup
            filterKey="boundary"
            label="Boundary crossed"
            options={boundaryOptions}
            filters={filters}
            onChange={update}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <span className="font-semibold text-foreground tabular-nums">{visible.length}</span> of{' '}
            <span className="tabular-nums">{allIncidents.length}</span> incidents match, newest first
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={toggleAll} disabled={shown.length === 0}>
              {allOpen ? <ChevronsDownUp aria-hidden /> : <ChevronsUpDown aria-hidden />}
              {allOpen ? 'Hide all details' : 'Show all details'}
            </Button>
            <Button variant="outline" size="sm" onClick={reset} disabled={!isFiltered}>
              <RotateCcw aria-hidden />
              Reset filters
            </Button>
          </div>
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {shown.map((incident, index) => {
              const isOpen = open.has(incident.id);
              // In the two-column grid, cards in a row share a height while both are closed. Once one opens,
              // both take their own height, so the other card does not stretch around empty space.
              const rowMate = shown[index ^ 1];
              const rowOpen = isOpen || (rowMate !== undefined && open.has(rowMate.id));
              return (
                <li key={incident.id} className={cn('flex', rowOpen && 'md:self-start')}>
                  <IncidentLogCard
                    incident={incident}
                    open={isOpen}
                    onToggle={() => toggle(incident.id)}
                    className={cn(
                      'w-full transition-shadow duration-500',
                      highlight?.id === incident.id && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    )}
                  />
                </li>
              );
            })}
          </ul>
          {hiddenCount > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" onClick={showMore}>
                Show {hiddenCount} more {hiddenCount === 1 ? 'incident' : 'incidents'}
                <ChevronDown aria-hidden />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed p-10 text-center">
          <SearchX className="h-8 w-8 text-muted-foreground" aria-hidden />
          <p className="text-muted-foreground">No incident matches all of these filters.</p>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw aria-hidden />
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
}
