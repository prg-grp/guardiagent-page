import { incidentsLastReviewed } from '@/lib/incidents';
import { footerNav } from '@/lib/nav';
import { Github, Globe, Linkedin, Mail, Shield } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-slate-300">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-white">GuardiAgent</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Research on bounding and observing AI agents by the{' '}
                <a
                  href="https://programming-group.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Programming Group
                </a>{' '}
                at the University of St. Gallen in Switzerland.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">Research</h3>
              <ul className="space-y-2 text-sm">
                {footerNav.research.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">Project</h3>
              <ul className="space-y-2 text-sm">
                {footerNav.project.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://programming-group.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    Programming Group
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">Connect</h3>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/GuardiAgent/"
                  target="_blank"
                  aria-label="GitHub"
                  className="transition-colors hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://programming-group.com"
                  target="_blank"
                  aria-label="Programming Group website"
                  className="transition-colors hover:text-primary"
                >
                  <Globe className="h-5 w-5" />
                </Link>
                <Link href="mailto:info@guardiagent.com" aria-label="Email" className="transition-colors hover:text-primary">
                  <Mail className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/showcase/guardiagent"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="transition-colors hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-400 md:flex-row md:items-center">
            <p>&copy; {new Date().getFullYear()} Programming Group, University of St. Gallen. All rights reserved.</p>
            <p>Incident log last reviewed: {incidentsLastReviewed}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
