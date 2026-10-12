import { cn } from '@/lib/utils';
import { ArrowLeftRight, Bot, Box, Cloud, FileCheck2, Server, Shield, User } from 'lucide-react';
import type React from 'react';

// Fig. 2 of the paper, drawn with real text so it stays legible on a phone. Below lg the flow runs top to bottom.

function Connector({ vertical = false }: { vertical?: boolean }) {
  return (
    <ArrowLeftRight
      className={cn('h-5 w-5 shrink-0 text-slate-500', vertical && 'rotate-90 lg:rotate-0')}
      aria-hidden
    />
  );
}

function Actor({ icon: Icon, label, detail }: { icon: React.ElementType; label: string; detail?: string }) {
  return (
    <div className="flex items-center gap-2.5 lg:flex-col lg:gap-2 lg:text-center">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
        <Icon className="h-5 w-5 text-slate-200" aria-hidden />
      </span>
      <span className="text-sm font-medium text-slate-100">
        {label}
        {detail && <span className="block text-xs font-normal text-slate-400">{detail}</span>}
      </span>
    </div>
  );
}

function Part({
  icon: Icon,
  label,
  detail,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  detail?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-3 text-center lg:w-40 lg:flex-none',
        accent ? 'border-bound-soft/50 bg-bound-soft/15' : 'border-white/15 bg-white/5'
      )}
    >
      <Icon className={cn('h-5 w-5', accent ? 'text-bound-soft' : 'text-slate-200')} aria-hidden />
      <span className="text-sm leading-snug font-medium text-slate-100">
        {label}
        {detail && <span className="block text-xs font-normal text-slate-400">{detail}</span>}
      </span>
    </div>
  );
}

export function OverviewDiagram() {
  return (
    <div className="rounded-2xl bg-slate-900 px-4 py-6 md:px-10 md:py-12">
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-4">
        <div className="flex items-center gap-3 lg:gap-4">
          <Actor icon={User} label="User" />
          <Connector />
          <Actor icon={Bot} label="AI agent" />
        </div>
        <Connector vertical />
        <div className="w-full max-w-sm rounded-xl border border-bound-soft/40 bg-bound-soft/5 p-3 lg:w-auto lg:max-w-none lg:p-4">
          <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-bound-soft">
            <Shield className="h-3.5 w-3.5" aria-hidden />
            AgentBound
          </div>
          <div className="flex items-stretch gap-2">
            <Part icon={Server} label="MCP server" />
            <ArrowLeftRight className="h-4 w-4 shrink-0 self-center text-slate-500" aria-hidden />
            <Part icon={Box} label="Policy enforcement engine" detail="AgentBox" accent />
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-2 text-center text-xs text-slate-200">
            <FileCheck2 className="h-4 w-4 shrink-0 text-bound-soft" aria-hidden />
            <span>
              Access control policy <span className="text-slate-400">(AgentManifest)</span>
            </span>
          </div>
        </div>
        <Connector vertical />
        <Actor icon={Cloud} label="Environment" detail="OS, internet, ..." />
      </div>
    </div>
  );
}
