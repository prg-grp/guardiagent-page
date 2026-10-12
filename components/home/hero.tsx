import { GradientText } from '@/components/page-hero';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]" />
        <div className="absolute -top-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-bound/35 blur-3xl md:left-[8%]" />
        <div className="absolute -right-40 -bottom-48 h-[30rem] w-[30rem] rounded-full bg-spy/35 blur-3xl md:right-[8%]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-36">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h1 className="mb-8 text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl md:text-7xl">
            Bounding what AI agents can access and <GradientText>observing what they do</GradientText>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-pretty text-slate-300 sm:text-lg md:text-xl">
            GuardiAgent is a research project of the{' '}
            <a
              href="https://programming-group.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              Programming Group
            </a>{' '}
            at the University of St. Gallen in Switzerland.{' '}
            <span className="font-semibold text-white">AgentBound</span> enforces least privilege for the MCP servers an
            agent uses, and <span className="font-semibold text-white">AgentSpy</span> records what an agent and every
            process it starts do at the operating-system level.
          </p>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-12 bg-bound px-6 text-base text-white hover:bg-bound/90">
              <Link href="/#why-now">
                See the 2026 incidents
                <ArrowDown className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/25 bg-white/5 px-6 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white dark:border-white/25 dark:bg-white/5 dark:hover:bg-white/15"
            >
              <Link href="/approach">Compare AgentBound and AgentSpy</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
