import { Code as CodeIcon } from 'lucide-react';

export default function Devs() {
  return (
    <>
      <section className="relative min-h-screen/2 flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-teal-900 to-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-8 animate-float">
              <div className="relative">
                <CodeIcon className="h-24 w-24 text-primary mx-auto" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
              How to use{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">AgendBound</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
              Use the AgentBound Framework to secure your AI Agent. Encapsulate the least common denominator in agentic
              software: the MCP server.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
      </section>
      <div className="content-grid">
        <section>
          <h2>Why you need GuardiAgent and AgentBound</h2>
        </section>
        <section>
          <h2>Quick Start</h2>
        </section>
        <section>
          <h2>The Security Manifest</h2>
        </section>
        <section>
          <h2>Runtime Permissions</h2>
        </section>
        <section>
          <h2>Sandboxed Container Images</h2>
        </section>
        <section>
          <h2>Multi-Server Orchestration</h2>
        </section>
        <section>
          <h2>Advanced Integration Topics</h2>
        </section>
        <section>
          <h2>Autogenerate Server Manifest</h2>
        </section>
      </div>
    </>
  );
}
