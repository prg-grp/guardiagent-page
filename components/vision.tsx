'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCog, Eye, Lock, Package, Shield, UserCheck2 } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'MCP Server Sandboxing',
    description:
      'Isolate Model Context Protocol servers in secure containers with restricted permissions and resource limits.',
  },
  {
    icon: Lock,
    title: 'Zero-Trust Architecture',
    description: 'Every MCP server runs with minimal privileges. No implicit trust, only explicit permissions.',
  },
  {
    icon: UserCheck2,
    title: 'User-Consent First',
    description:
      'The user decides what the software is allowed to access and do. No surprising network calls to dubious websites.',
  },
  {
    icon: BrainCog,
    title: 'Ease-of-Access',
    description:
      'Support engineers and maintainers of agentic AI and MCP software by automatically bootstrap the security manifest.',
  },
  {
    icon: Package,
    title: 'Verified MCP/Agent Marketplace',
    description:
      'Coming soon: Download trusted, verified, and certified MCP servers and AI agent applications from our curated app store.',
  },
  {
    icon: Eye,
    title: 'Easy Observability',
    description:
      'Coming soon: Know what servers are running on your machine and have a trusted and secure execution environment for your use-cases.',
  },
];

export function Vision() {
  return (
    <section id="vision" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Our Vision: Enterprise Security for AI Applications
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Comprehensive protection that does not slow down your application or compromise your system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
