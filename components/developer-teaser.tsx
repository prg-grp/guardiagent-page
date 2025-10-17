import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code as CodeIcon, GitBranch, Terminal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Code } from './code';

export function DeveloperTeaser() {
  return (
    <section id="developers" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4">
              <CodeIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">For Developers</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Build Secure AI Agents in Minutes</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto text-pretty leading-relaxed">
              Simple APIs, compatible with current agent SDKs. Integrate the GuardiAgent security sandbox with little to no
              changes in your code.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-secondary" />
                  Quick Start Integration
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Wrap your MCP server with the GuardiAgent sandbox in seconds
                </CardDescription>
              </CardHeader>
              <CardContent className="flex grow">
                <Code
                  className="p-4 rounded-lg"
                  lang="python"
                  code={[
                    `import os

from agents import Agent
from mcp_sandbox_openai_sdk import (
  FSAccess,
  SandboxedMCPStdio
)

async def main():
  async with SandboxedMCPStdio(
    manifest=manifest,
    runtime_args=[os.path.abspath("./")],
    runtime_permissions=[FSAccess(os.path.abspath("./"))],
  ) as server:
    agent = Agent(
      name="MCP Sandbox Test",
      model="gpt-5-mini",
      mcp_servers=[server],
    )`,
                  ]}
                />
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-secondary" />
                  Architecture Overview (simple)
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Understanding the GuardiAgent sandbox architecture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-[#1e1e1e] p-4 rounded-lg text-center">
                  <Image
                    src="/architecture.svg"
                    alt="Sandbox Architecture"
                    width={400}
                    height={600}
                    className="rounded inline-block"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Permission System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  [CONTENT: Explain granular permission controls - filesystem access levels, network whitelisting,
                  environment variable isolation, and resource quotas]
                </p>
                <pre className="bg-slate-950 p-3 rounded text-xs font-mono text-green-400">
                  {`permissions: {
  filesystem: {
    read: ['/data'],
    write: ['/tmp']
  },
  network: {
    allow: ['*.api.com'],
    deny: ['*']
  }
}`}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Threat Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  [CONTENT: Describe real-time monitoring of system calls, pattern matching for suspicious behavior, ML-based
                  anomaly detection, and automatic response]
                </p>
                <pre className="bg-slate-950 p-3 rounded text-xs font-mono text-green-400">
                  {`onThreat: (threat) => {
  if (threat.severity > 7) {
    sandbox.terminate()
    alert.send(threat)
  }
}`}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Audit Logging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  [CONTENT: Detail comprehensive logging of all operations, exportable audit trails, compliance reporting,
                  and integration with SIEM systems]
                </p>
                <pre className="bg-slate-950 p-3 rounded text-xs font-mono text-green-400">
                  {`const logs = await sandbox
  .getLogs({
    timeRange: '24h',
    severity: 'high'
  })`}
                </pre>
              </CardContent>
            </Card>
          </div> */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/developers">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-slate-900 cursor-pointer">
                <BookOpen className="mr-2 h-5 w-5" />
                Read The Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
