import { Team } from '@/components/research-hub/team';
import { Section } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function Contact() {
  return (
    <Section id="contact" tone="muted">
      <div className="mx-auto max-w-5xl rounded-2xl border-2 border-primary/20 bg-background p-6 shadow-sm md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-3 text-3xl leading-tight font-bold md:text-4xl">Stay in touch</h2>
            <p className="max-w-2xl leading-relaxed text-pretty text-muted-foreground md:text-lg">
              For questions, collaborations or news about new papers and releases, send an email to{' '}
              <a
                href="mailto:info@guardiagent.com"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                info@guardiagent.com
              </a>
              .
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <a href="mailto:info@guardiagent.com">
              <Mail className="h-4 w-4" aria-hidden />
              Email us
            </a>
          </Button>
        </div>

        <h3 className="mt-10 mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">Team</h3>
        <Team />
      </div>
    </Section>
  );
}
