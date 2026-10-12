import { Button } from '@/components/ui/button';
import { ArrowRight, ScanEye } from 'lucide-react';
import Link from 'next/link';

export function ReportBand() {
  return (
    <section aria-labelledby="try-report" className="border-y border-spy/20 bg-spy/5">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex gap-4">
            <span className="h-fit shrink-0 rounded-xl bg-spy/10 p-3 text-spy">
              <ScanEye className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 id="try-report" className="mb-1 text-2xl font-bold">
                Try the AgentSpy report
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                Pick a model and a task, then read the reliability report for recorded runs from the paper&apos;s
                experiments. Nothing runs in your browser.
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-spy text-white hover:bg-spy/90">
            <Link href="/research/agentspy#simulator">
              Open the simulator
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
