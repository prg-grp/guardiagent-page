import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import type React from 'react';

// Native <details>: secondary material stays collapsed by default and needs no client code.
export function Disclosure({
  summary,
  children,
  className,
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <details className={cn('group overflow-hidden rounded-xl border bg-background', className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted/60 md:px-5 [&::-webkit-details-marker]:hidden">
        {summary}
        <ChevronDown
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="border-t px-4 py-5 md:px-5">{children}</div>
    </details>
  );
}
