import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import dedent from 'dedent-js';
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
                  Wrap your MCP server with the GuardiAgent sandbox in seconds. Seamlessly integrate with the OpenAI Agent
                  SDK.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex grow">
                <Code
                  className="p-4 rounded-lg w-full h-full"
                  lang="python"
                  code={[
                    dedent`
                    import os

                    from agents import Agent
                    from mcp_sandbox_openai_sdk import (
                      FSAccess,
                      SandboxedMCPStdio
                    )

                    async def main():
                      async with SandboxedMCPStdio(
                        manifest=manifest,
                        runtime_args=[os.path.abspath("./")],
                        runtime_permissions=[
                          FSAccess(os.path.abspath("./"))
                        ],
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
                  The guardian that secures the smallest common part in agentic AI: the MCP server
                </CardDescription>
              </CardHeader>
              <CardContent className="flex grow">
                <div className="bg-[#1e1e1e] p-4 rounded-lg align-middle justify-center flex grow">
                  <Image
                    src="/architecture.svg"
                    alt="Sandbox Architecture"
                    width={450}
                    height={370}
                    className="rounded inline-block"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/developers">
              <Button
                size="lg"
                className="bg-secondary hover:bg-primary/90 ext-secondary-foreground hover:text-primary-foreground cursor-pointer"
              >
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
