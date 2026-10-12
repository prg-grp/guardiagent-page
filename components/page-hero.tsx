import { cn } from '@/lib/utils';
import type React from 'react';

// Dark gradient hero shared by the inner pages. The home page has its own, larger hero.
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-linear-to-br from-slate-900 via-teal-950 to-slate-900 text-white',
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-bound/25 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-spy/25 blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && <div className="mb-6 flex flex-wrap items-center justify-center gap-2">{eyebrow}</div>}
          <h1 className="mb-6 text-4xl font-bold text-balance md:text-6xl">{title}</h1>
          {description && (
            <div className="mx-auto max-w-3xl text-lg leading-relaxed text-pretty text-slate-300 md:text-xl">
              {description}
            </div>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="bg-linear-to-r from-bound-soft to-spy-soft bg-clip-text text-transparent">{children}</span>;
}
