import { Code } from '@/components/code';
import { Section, SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { githubRepos } from '@/lib/papers';
import dedent from 'dedent-js';
import { ArrowRight, ArrowUpRight, BookOpen, ScanEye } from 'lucide-react';
import Link from 'next/link';

// Kept under 40 columns so it reads without sideways scrolling on a 375px phone.
const example = dedent`
  import os

  from agents import Agent
  from mcp_sandbox_openai_sdk import (
    FSAccess,
    SandboxedMCPStdio
  )

  async def main():
    workdir = os.path.abspath("./")
    async with SandboxedMCPStdio(
      manifest=manifest,
      runtime_args=[workdir],
      runtime_permissions=[
        FSAccess(workdir)
      ],
    ) as server:
      agent = Agent(
        name="MCP Sandbox Test",
        model="gpt-5-mini",
        mcp_servers=[server],
      )`;

export function Developers() {
  return (
    <Section id="developers" tone="dark">
      <SectionHeader
        dark
        title="Run MCP servers in the AgentBound sandbox"
        description={
          <p>
            The sandbox runs a stdio MCP server in a Docker container with only the permissions its manifest declares
            and you approve.
          </p>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
        <div className="min-w-0 rounded-2xl border border-slate-700 bg-slate-800/80 p-5 md:p-6">
          <p className="mb-4 text-sm leading-relaxed text-slate-400">
            With the OpenAI Agents SDK, use <code className="font-mono text-slate-200">SandboxedMCPStdio</code> in place
            of the SDK&apos;s stdio server.
          </p>
          <Code className="w-full rounded-lg p-3 text-xs sm:p-4 sm:text-sm" lang="python" code={example} />
        </div>

        <div className="min-w-0 space-y-8">
          <div>
            <h3 className="mb-3 font-semibold text-white">Code on GitHub</h3>
            <ul className="space-y-2">
              {githubRepos.map((repo) => (
                <li key={repo.href}>
                  <a
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-sm break-all text-bound-soft underline-offset-4 hover:underline"
                  >
                    {repo.label}
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="flex gap-2 text-sm leading-relaxed text-slate-400">
            <ScanEye className="mt-0.5 h-4 w-4 shrink-0 text-spy-soft" aria-hidden />
            <span>
              <span className="font-semibold text-spy-soft">AgentSpy</span> is a research preprint.{' '}
              <Link href="/research/agentspy" className="text-slate-200 underline underline-offset-4 hover:text-white">
                Read about AgentSpy
              </Link>
            </span>
          </p>

          <Button asChild size="lg" className="w-full bg-bound text-white hover:bg-bound/90 sm:w-auto">
            <Link href="/developers">
              <BookOpen className="mr-1 h-4 w-4" aria-hidden />
              Developer guide
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
