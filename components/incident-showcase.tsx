import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Database, FileX, Terminal } from 'lucide-react';

const incidents = [
  {
    icon: Database,
    title: 'Replit Production Database Deletion',
    date: 'Jul 2025',
    description:
      'An AI agent with unrestricted database access deleted the entire production database because it "panicked".',
    severity: 'Critical',
    impact: 'Data Loss, Service Outage',
  },
  {
    icon: FileX,
    title: 'Local Files Deleted',
    date: 'Jul 2025',
    description:
      'Copilot messed up a tiny detail in a command of an engineer. Executed the CMD command and deleted the users entire "D:/" directory with all private photos and videos.',
    severity: 'High',
    impact: 'Data Loss',
  },
  {
    icon: Terminal,
    title: 'Gemini AI CLI Hijack',
    date: 'Jun 2025',
    description:
      'An attack on the Gemini AI CLI allowed attackers to silently execute malicious commands on the users machine.',
    severity: 'Critical',
    impact: 'System Compromise, Supply Chain Risk',
  },
];

export function IncidentShowcase() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-semibold">Real Incidents</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">When AI Agents Go Rogue</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              What happens, if your agentic AI software has unrestricted priviledges on your machine?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {incidents.map((incident, index) => (
              <Card key={index} className="border-2 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <incident.icon className="h-6 w-6 text-destructive" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-destructive/20 text-destructive rounded">
                      {incident.severity}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{incident.title}</CardTitle>
                  <CardDescription>{incident.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col grow">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{incident.description}</p>
                  <div className="grow flex"></div>
                  <div className="text-xs text-destructive font-semibold">Impact: {incident.impact}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg border-4 border-primary/20 hover:border-primary transition-colors">
            <p className="text-lg font-semibold mb-2">Don't let this happen to you.</p>
            <p className="text-muted-foreground">
              GuardiAgent provides enterprise-grade sandboxing to isolate and protect your systems from rogue AI agents and
              compromised MCP servers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
