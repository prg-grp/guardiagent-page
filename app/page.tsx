import { Boundaries } from '@/components/home/boundaries';
import { Contact } from '@/components/home/contact';
import { Developers } from '@/components/home/developers';
import { HomeHero } from '@/components/home/hero';
import { RecentIncidents } from '@/components/home/incidents';
import { Papers } from '@/components/home/papers';
import { ReportBand } from '@/components/home/report-band';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'GuardiAgent: Bound and observe AI agents' },
  description:
    'AI agent security research at the University of St. Gallen. AgentBound (ACM FSE 2026) enforces least privilege for MCP servers; AgentSpy (arXiv preprint, 2026) records what an agent and every process it starts do at the operating-system level.',
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <RecentIncidents />
      <Papers />
      <Boundaries />
      <ReportBand />
      <Developers />
      <Contact />
    </>
  );
}
