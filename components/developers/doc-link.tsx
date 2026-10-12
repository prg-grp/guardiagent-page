import { cn } from '@/lib/utils';
import Link from 'next/link';
import type React from 'react';

// Internal links go through next/link; anything starting with http opens in a new tab.
export function DocLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// Jumps to a line in a highlighted code block. The id is set by the `[!code anchor=...]` notation in Code.
export function CodeAnchor({ anchor, children }: { anchor: string; children: React.ReactNode }) {
  return (
    <Link href={`#${anchor}`} className="font-medium underline decoration-bound decoration-2 underline-offset-2">
      {children}
    </Link>
  );
}

// Inline code in running text. Breaks long identifiers so they never widen the page on mobile.
export function InlineCode({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <code className={cn('rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] wrap-anywhere', className)}>
      {children}
    </code>
  );
}
