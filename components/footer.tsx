import { Github, Globe, Mail, Shield } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-white">GuardiAgent</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Security for AI agents and MCP servers.</p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/developers" className="hover:text-primary transition-colors">
                    How to use
                  </a>
                </li>
                <li>
                  <a href="/researchers" className="hover:text-primary transition-colors">
                    Research
                  </a>
                </li>
                <li>
                  <a href="https://programming-group.com" target="_blank" className="hover:text-primary transition-colors">
                    Programming Group
                  </a>
                </li>
              </ul>
            </div>

            <div></div>

            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/GuardiAgent/"
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="https://programming-group.com" target="_blank" className="hover:text-primary transition-colors">
                  <Globe className="h-5 w-5" />
                </Link>
                <Link href="mailto:info@guardiagent.com" className="hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Programming-Group. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
