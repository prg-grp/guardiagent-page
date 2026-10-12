import { Checklist } from '@/components/developers/checklist';
import { ContainersSection } from '@/components/developers/containers-section';
import { InlineCode } from '@/components/developers/doc-link';
import { ManifestSection } from '@/components/developers/manifest-section';
import { PageToc } from '@/components/developers/page-toc';
import { QuickStart } from '@/components/developers/quick-start';
import { RuntimePermissions } from '@/components/developers/runtime-permissions';
import { StatusTable } from '@/components/developers/status-table';
import { PageHero } from '@/components/page-hero';
import { Section, SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { agentBound } from '@/lib/papers';
import { ArrowDown, Github } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For developers',
  description:
    'Run MCP servers in the AgentBound sandbox: quick start, security manifest, runtime permissions and container configuration, with the release status of AgentSpy and a checklist from our papers.',
};

const githubOrg = agentBound.links.find((l) => l.href.startsWith('https://github.com'));

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        title="Put a boundary around your agent's MCP servers"
        description="The AgentBound sandbox runs each MCP server in its own container and grants it only the files, variables and hosts you approve. AgentSpy is a research preprint."
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="cursor-pointer bg-bound text-white hover:bg-bound/90">
            <Link href="#quick-start">
              Go to the quick start
              <ArrowDown className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </Button>
          {githubOrg && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:hover:bg-white/10"
            >
              <a href={githubOrg.href} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-4 w-4" aria-hidden />
                GuardiAgent on GitHub
              </a>
            </Button>
          )}
        </div>
      </PageHero>

      <PageToc />

      <Section id="status">
        <SectionHeader align="left" title="Release status" description="Only AgentBound has released code." />
        <StatusTable />
      </Section>

      <Section id="quick-start" tone="muted">
        <SectionHeader
          align="left"
          title="Quick start"
          description="This example uses the Python wrapper for the OpenAI Agents SDK, which adds manifest checks and consent prompts to the Docker sandbox."
        />
        <QuickStart />
      </Section>

      <Section id="manifest">
        <SectionHeader
          align="left"
          title="The security manifest"
          description="An MCP server declares the kinds of access it needs in a JSON manifest, modeled on Android app permissions."
        />
        <ManifestSection />
      </Section>

      <Section id="runtime-permissions" tone="muted">
        <SectionHeader
          align="left"
          title="Runtime permissions"
          description="Runtime permissions turn the capabilities of a manifest into concrete resources, and the user approves each one at launch. The sandbox does not check how a server uses a resource it was granted."
        />
        <RuntimePermissions />
      </Section>

      <Section id="containers">
        <SectionHeader
          align="left"
          title="Container images"
          description={
            <>
              The wrapper starts <InlineCode>ghcr.io/guardiagent/mcp-sandbox-npm</InlineCode> or{' '}
              <InlineCode>ghcr.io/guardiagent/mcp-sandbox-pypi</InlineCode>, depending on the registry in the manifest.
              You can also extend the base image into your own runtime image.
            </>
          }
        />
        <ContainersSection />
      </Section>

      <Section id="checklist" tone="dark">
        <SectionHeader
          align="left"
          dark
          title="Checklist from our papers"
          description="Practices that follow from the AgentBound and AgentSpy results, with the paper sections they draw on."
        />
        <Checklist />
      </Section>
    </>
  );
}
