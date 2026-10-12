import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';

const description =
  'Research on AI agent security from the University of St. Gallen. AgentBound (ACM FSE 2026) bounds what MCP servers can access; AgentSpy (arXiv 2026) records what agents actually do at the operating-system level.';

export const metadata: Metadata = {
  metadataBase: new URL('https://guardiagent.com'),
  title: {
    default: 'GuardiAgent: Bound and observe AI agents',
    template: '%s · GuardiAgent',
  },
  description,
  openGraph: {
    type: 'website',
    siteName: 'GuardiAgent',
    title: 'GuardiAgent: Bound and observe AI agents',
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
