import { DeveloperTeaser } from '@/components/developer-teaser';
import { HeroSection } from '@/components/hero-section';
import { IncidentShowcase } from '@/components/incident-showcase';
import { NewsletterSection } from '@/components/newsletter-section';
import { ResearcherTeaser } from '@/components/researcher-teaser';
import { Vision } from '@/components/vision';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IncidentShowcase />
      <Vision />
      <DeveloperTeaser />
      <ResearcherTeaser />
      <NewsletterSection />
    </main>
  );
}
