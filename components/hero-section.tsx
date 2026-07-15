import { Button } from '@/components/ui/button';
import { Code, Codesandbox, GraduationCap, Lock, Shield } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating shield icon */}
          <div className="inline-block mb-8 animate-float">
            <div className="relative">
              <Shield className="h-24 w-24 text-primary mx-auto" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
            Secure the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI Agents</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
            Make your agentic workflow more secure. Guard your system against data exfiltration and system attacks by securing
            your Model Context Protocol (MCP) servers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/#developers">
              <Button size="lg" className="text-lg px-8 py-6 cursor-pointer bg-primary hover:bg-primary/90">
                <Code className="mr-2 h-5 w-5" />
                Show Me How
              </Button>
            </Link>
            <Link href="/#research">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 cursor-pointer bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Show The Research
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Zero-Trust Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <span>Least-Priviledge Execution</span>
            </div>
            <div className="flex items-center gap-2">
              <Codesandbox className="h-5 w-5 text-secondary" />
              <span>Sandboxed Environment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
