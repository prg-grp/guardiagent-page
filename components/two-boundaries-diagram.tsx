import { cn } from '@/lib/utils';
import { ScanEye, Shield } from 'lucide-react';

export type DiagramMode = 'both' | 'prevent' | 'observe' | 'gaps';

type Group = 'bound' | 'spy' | 'gap' | 'base';

// Which groups stay fully visible in each mode. Everything else fades.
const visible: Record<DiagramMode, Group[]> = {
  both: ['bound', 'spy', 'gap', 'base'],
  prevent: ['bound', 'base'],
  observe: ['spy', 'base'],
  gaps: ['gap', 'base'],
};

function fade(mode: DiagramMode, group: Group) {
  return cn('transition-opacity duration-300 motion-reduce:transition-none', !visible[mode].includes(group) && 'opacity-15');
}

function Wall({ x, label, chip }: { x: number; label: string; chip: string }) {
  return (
    <g>
      <rect x={x} y={226} width={200} height={104} rx={14} className="fill-bound/5 stroke-bound" strokeWidth={2.5} />
      <rect x={x + 16} y={240} width={168} height={40} rx={8} className="fill-background stroke-slate-400" strokeWidth={1} />
      <text x={x + 100} y={265} textAnchor="middle" className="fill-foreground text-[14px] font-semibold">
        {label}
      </text>
      <rect x={x + 12} y={290} width={176} height={26} rx={6} className="fill-bound/10" />
      <text x={x + 100} y={307} textAnchor="middle" className="fill-bound font-mono text-[11px]">
        {chip}
      </text>
    </g>
  );
}

function AlertRing({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={13} className="fill-alert/15 stroke-alert" strokeWidth={2.5} />
      <text x={cx} y={cy + 5} textAnchor="middle" className="fill-alert text-[14px] font-bold">
        !
      </text>
    </g>
  );
}

function Host({ x, label, note, tone }: { x: number; label: string; note: string; tone: 'ok' | 'bad' }) {
  return (
    <g>
      <rect
        x={x}
        y={552}
        width={200}
        height={48}
        rx={10}
        className={cn('fill-background', tone === 'ok' ? 'stroke-slate-400' : 'stroke-destructive')}
        strokeWidth={1.5}
        strokeDasharray={tone === 'bad' ? '5 4' : undefined}
      />
      <text x={x + 100} y={572} textAnchor="middle" className="fill-foreground font-mono text-[12px]">
        {label}
      </text>
      <text
        x={x + 100}
        y={590}
        textAnchor="middle"
        className={cn('text-[11px]', tone === 'ok' ? 'fill-muted-foreground' : 'fill-destructive')}
      >
        {note}
      </text>
    </g>
  );
}

export function TwoBoundariesDiagram({ mode = 'both', className }: { mode?: DiagramMode; className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 620"
      role="img"
      aria-labelledby="two-boundaries-title two-boundaries-desc"
      className={cn('h-auto w-full select-none', className)}
    >
      <title id="two-boundaries-title">Tool boundary and OS boundary</title>
      <desc id="two-boundaries-desc">
        An agent calls three MCP servers, each inside an AgentBound sandbox with a manifest, and a skill script that is
        not an MCP server. Below them, AgentSpy records every system call and connection at the operating-system
        boundary. Path P: the Maps server tries to reach an unlisted IP and is blocked by its manifest. Path O: the skill
        script reads a private SSH key and uploads it to an unlisted host; AgentSpy raises two alerts while the
        trajectory shows one successful tool call. Path G: a permitted Wallet call with tampered parameters passes both
        layers.
      </desc>

      <defs>
        <marker id="arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" className="fill-slate-400" />
        </marker>
        <marker id="arrow-alert" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" className="fill-alert" />
        </marker>
        <marker id="arrow-gap" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
        </marker>
      </defs>

      {/* Stated intent: instructions are not a boundary */}
      <g className={fade(mode, 'base')}>
        <rect
          x={20}
          y={16}
          width={960}
          height={52}
          rx={10}
          className="fill-muted/60 stroke-muted-foreground"
          strokeDasharray="6 5"
          strokeWidth={1.2}
        />
        <text x={40} y={47} className="fill-muted-foreground text-[13px]">
          <tspan className="font-semibold fill-foreground">Task instructions:</tspan> "use local files only", "no
          internet access", "stay in the workspace"
        </text>
        <text x={960} y={47} textAnchor="end" className="fill-muted-foreground text-[13px] italic">
          stated, not enforced
        </text>
      </g>

      {/* AgentSpy: disposable microVM frame */}
      <g className={fade(mode, 'spy')}>
        <rect
          x={20}
          y={92}
          width={960}
          height={430}
          rx={20}
          className="fill-spy/[0.03] stroke-spy"
          strokeDasharray="8 6"
          strokeWidth={1.6}
        />
        <ScanEye x={684} y={101} width={16} height={16} className="stroke-spy" />
        <text x={960} y={114} textAnchor="end" className="fill-spy text-[12px] font-semibold">
          Disposable microVM · AgentSpy audit run
        </text>
      </g>

      {/* Agent harness */}
      <g className={fade(mode, 'base')}>
        <rect x={330} y={128} width={340} height={60} rx={12} className="fill-slate-900 stroke-slate-900" />
        <text x={500} y={154} textAnchor="middle" className="fill-white text-[15px] font-semibold">
          Agent harness + LLM
        </text>
        <text x={500} y={174} textAnchor="middle" className="fill-slate-300 text-[12px]">
          plans, calls tools, runs commands
        </text>
        {/* Trajectory tag */}
        <rect
          x={690}
          y={134}
          width={270}
          height={48}
          rx={8}
          className="fill-background stroke-muted-foreground"
          strokeDasharray="4 4"
        />
        <text x={704} y={153} className="fill-muted-foreground text-[11px] font-semibold uppercase tracking-wide">
          Trajectory (the agent's own record)
        </text>
        <text x={704} y={172} className="fill-foreground font-mono text-[11px]">
          bash scripts/sync_cache.sh: exit 0
        </text>
        {/* Calls down to tools */}
        <path d="M400 188 L150 226" className="stroke-slate-400" strokeWidth={1.2} fill="none" />
        <path d="M460 188 L380 226" className="stroke-slate-400" strokeWidth={1.2} fill="none" />
        <path d="M540 188 L610 226" className="stroke-slate-400" strokeWidth={1.2} fill="none" />
        <path d="M600 188 L855 232" className="stroke-slate-400" strokeWidth={1.2} fill="none" />
      </g>

      {/* AgentBound: one sandbox per MCP server */}
      <g className={fade(mode, 'bound')}>
        <rect x={44} y={201} width={372} height={19} rx={4} className="fill-background" />
        <Shield x={48} y={203} width={15} height={15} className="stroke-bound" />
        <text x={68} y={215} className="fill-bound text-[12px] font-semibold">
          AgentBound · tool boundary · enforced before the action runs
        </text>
        <Wall x={50} label="Filesystem MCP" chip="fs.read ./work" />
        <Wall x={280} label="Wallet MCP" chip="net: api.wallet.example" />
        <Wall x={510} label="Maps MCP" chip="net: maps.googleapis.com" />
      </g>

      {/* Skill script: not an MCP server */}
      <g className={fade(mode, 'base')}>
        <rect
          x={760}
          y={232}
          width={190}
          height={52}
          rx={8}
          className="fill-background stroke-muted-foreground"
          strokeDasharray="5 4"
          strokeWidth={1.4}
        />
        <text x={855} y={254} textAnchor="middle" className="fill-foreground font-mono text-[12px]">
          skill script
        </text>
        <text x={855} y={273} textAnchor="middle" className="fill-muted-foreground text-[11px]">
          not an MCP server
        </text>
      </g>

      {/* Normal, permitted operation: filesystem server reads the workspace */}
      <g className={fade(mode, 'base')}>
        <path d="M150 330 L150 446" className="stroke-slate-400" strokeWidth={1.4} fill="none" markerEnd="url(#arrow-muted)" />
        <rect x={60} y={450} width={180} height={44} rx={10} className="fill-background stroke-slate-400" />
        <text x={150} y={477} textAnchor="middle" className="fill-foreground font-mono text-[12px]">
          ./work (workspace)
        </text>
      </g>

      {/* AgentSpy: OS boundary plane */}
      <g className={fade(mode, 'spy')}>
        <rect x={40} y={370} width={920} height={40} rx={10} className="fill-spy/10 stroke-spy" strokeWidth={1.5} />
        <ScanEye x={54} y={382} width={16} height={16} className="stroke-spy" />
        <text x={76} y={395} className="fill-spy text-[12px] font-semibold">
          AgentSpy · OS boundary · recorded outside the agent
        </text>
        <text x={640} y={395} textAnchor="end" className="fill-spy/80 font-mono text-[11px]">
          execve · openat · connect
        </text>
      </g>

      {/* Path P (prevent): Maps server rebuilds its host as a raw IP; blocked at the wall */}
      <g className={fade(mode, 'bound')}>
        <path d="M610 280 L610 322" className="stroke-destructive" strokeWidth={2.5} fill="none" />
        <g className="stroke-destructive" strokeWidth={3} strokeLinecap="round">
          <line x1={601} y1={322} x2={619} y2={340} />
          <line x1={619} y1={322} x2={601} y2={340} />
        </g>
        <path
          d="M610 344 L610 548"
          className="stroke-destructive/40"
          strokeWidth={1.5}
          strokeDasharray="3 5"
          fill="none"
        />
        <rect x={486} y={335} width={112} height={32} rx={7} className="fill-background stroke-destructive" />
        <text x={542} y={349} textAnchor="middle" className="fill-destructive text-[12px] font-bold">
          P · blocked
        </text>
        <text x={542} y={362} textAnchor="middle" className="fill-destructive text-[10.5px]">
          not in manifest
        </text>
      </g>

      {/* Path G (gap): permitted call with tampered parameters passes both layers */}
      <g className={fade(mode, 'gap')}>
        <path
          d="M380 280 L380 548"
          className="stroke-muted-foreground"
          strokeWidth={2.5}
          strokeDasharray="7 5"
          fill="none"
          markerEnd="url(#arrow-gap)"
        />
        <rect x={392} y={426} width={150} height={44} rx={8} className="fill-background stroke-muted-foreground" />
        <text x={467} y={444} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
          G · passes both
        </text>
        <text x={467} y={461} textAnchor="middle" className="fill-muted-foreground text-[11px]">
          permitted call, tampered args
        </text>
      </g>

      {/* Path O (observe): skill script reads the SSH key and uploads it; two alerts at the OS plane */}
      <g className={fade(mode, 'spy')}>
        <path d="M815 284 L815 446" className="stroke-alert" strokeWidth={2.5} fill="none" markerEnd="url(#arrow-alert)" />
        <path d="M905 284 L905 548" className="stroke-alert" strokeWidth={2.5} fill="none" markerEnd="url(#arrow-alert)" />
        <AlertRing cx={815} cy={390} />
        <AlertRing cx={905} cy={390} />
        <rect x={752} y={450} width={126} height={44} rx={10} className="fill-background stroke-alert" strokeWidth={1.5} />
        <text x={815} y={477} textAnchor="middle" className="fill-foreground font-mono text-[12px]">
          ~/.ssh/id_rsa
        </text>
        <text x={802} y={346} textAnchor="end" className="fill-alert text-[12px] font-bold">
          O · two alerts
        </text>
        <text x={802} y={362} textAnchor="end" className="fill-alert text-[11px]">
          key read · unlisted host
        </text>
      </g>

      {/* Outside world */}
      <g className={fade(mode, 'base')}>
        <text x={40} y={545} className="fill-muted-foreground text-[11px] font-semibold uppercase tracking-wide">
          Internet
        </text>
        <Host x={280} label="api.wallet.example" note="allowed host" tone="ok" />
        <Host x={510} label="35.34.36.78" note="unlisted (never reached)" tone="bad" />
        <Host x={780} label="drop.example.net" note="unlisted host" tone="bad" />
      </g>
    </svg>
  );
}

const paths = [
  {
    key: 'P',
    tone: 'text-destructive border-destructive/40 bg-destructive/5',
    title: 'Prevent: blocked at the tool boundary',
    body: 'A Maps MCP server rebuilds its API host as a raw IP address. Its manifest only allows maps.googleapis.com, so AgentBound blocks the connection.',
    source: 'AgentBound, attack B.1',
  },
  {
    key: 'O',
    tone: 'text-alert border-alert/40 bg-alert/5',
    title: 'Observe: recorded at the OS boundary',
    body: 'A compromised skill tells the agent to run a helper script that uploads ~/.ssh/id_rsa. The trajectory shows one successful command; the system calls show the key read and the connection, and raise two alerts.',
    source: 'AgentSpy, Fig. 3',
  },
  {
    key: 'G',
    tone: 'text-muted-foreground border-border bg-muted/50',
    title: 'Gap: inside the allowed scope',
    body: 'A poisoned tool description changes the parameters of a permitted Wallet call. Every access is declared and every host is allowed, so neither layer flags it.',
    source: 'AgentBound, attack B.2',
  },
];

// Mobile and screen-reader friendly version of the same content.
export function TwoBoundariesStacked({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="rounded-xl border border-dashed border-muted-foreground/50 bg-muted/50 p-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Task instructions</span> ("no internet", "stay in the
        workspace") are stated, not enforced.
      </div>
      <div className="rounded-xl border-2 border-bound bg-bound/5 p-4 text-sm">
        <div className="mb-1 flex items-center gap-2 font-semibold text-bound">
          <Shield className="h-4 w-4" /> AgentBound · tool boundary
        </div>
        Each MCP server runs in its own sandbox and can only reach what its manifest declares and the user approved.
      </div>
      <div className="rounded-xl border-2 border-spy bg-spy/5 p-4 text-sm">
        <div className="mb-1 flex items-center gap-2 font-semibold text-spy">
          <ScanEye className="h-4 w-4" /> AgentSpy · OS boundary
        </div>
        Every system call and connection of the agent and every process it starts is recorded in a disposable microVM.
      </div>
      <ol className="space-y-3">
        {paths.map((p) => (
          <li key={p.key} className={cn('rounded-xl border p-4 text-sm', p.tone)}>
            <div className="mb-1 font-semibold">
              {p.key} · {p.title}
            </div>
            <p className="text-foreground/80">{p.body}</p>
            <p className="mt-2 text-xs opacity-80">{p.source}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function TwoBoundariesLegend({ className }: { className?: string }) {
  return (
    <ol className={cn('grid gap-3 md:grid-cols-3', className)}>
      {paths.map((p) => (
        <li key={p.key} className={cn('rounded-xl border p-4 text-sm', p.tone)}>
          <div className="mb-1 font-semibold">
            {p.key} · {p.title}
          </div>
          <p className="text-foreground/80 leading-relaxed">{p.body}</p>
          <p className="mt-2 text-xs opacity-80">{p.source}</p>
        </li>
      ))}
    </ol>
  );
}

export const diagramCaption =
  "Conceptual view. The paths come from the papers' own evaluation examples: AgentBound attacks B.1 and B.2, and the AgentSpy skill-injection example (Fig. 3). AgentBound and AgentSpy are separate research prototypes, evaluated separately: AgentBound runs alongside your agent; AgentSpy runs the agent in a disposable microVM to audit it.";
