import { cn } from '@/lib/utils';
import type React from 'react';

export function Eyebrow({
  children,
  icon: Icon,
  tone = 'primary',
  className,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
  tone?: 'primary' | 'destructive' | 'bound' | 'spy' | 'dark';
  className?: string;
}) {
  const tones = {
    primary: 'bg-primary/10 text-primary',
    destructive: 'bg-destructive/10 text-destructive',
    bound: 'bg-bound/10 text-bound',
    spy: 'bg-spy/10 text-spy',
    dark: 'bg-white/10 text-slate-200',
  };
  return (
    <div className={cn('inline-flex items-center gap-2 rounded-full px-4 py-1.5', tones[tone], className)}>
      {Icon && <Icon className="h-4 w-4" aria-hidden />}
      <span className="text-sm font-semibold">{children}</span>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  eyebrowTone,
  title,
  description,
  align = 'center',
  dark = false,
  className,
}: {
  eyebrow?: React.ReactNode;
  eyebrowIcon?: React.ElementType;
  eyebrowTone?: 'primary' | 'destructive' | 'bound' | 'spy' | 'dark';
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mb-12 md:mb-16', align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
      {eyebrow && (
        <Eyebrow icon={eyebrowIcon} tone={eyebrowTone ?? (dark ? 'dark' : 'primary')} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={cn('mb-4 text-3xl font-bold text-balance md:text-5xl', dark && 'text-white')}>{title}</h2>
      {description && (
        <div
          className={cn(
            'text-base leading-relaxed text-pretty sm:text-lg md:text-xl',
            dark ? 'text-slate-300' : 'text-muted-foreground',
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-3xl'
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  tone = 'default',
  className,
}: {
  id?: string;
  children: React.ReactNode;
  tone?: 'default' | 'muted' | 'dark';
  className?: string;
}) {
  const tones = {
    default: 'bg-background',
    muted: 'bg-muted/40',
    dark: 'bg-slate-900 text-white',
  };
  return (
    <section id={id} className={cn('scroll-mt-20 py-20 md:py-24', tones[tone], className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </section>
  );
}
