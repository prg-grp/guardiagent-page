import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import PerformanceChart from './research/performance-chart';

export function ResearcherTeaser() {
  return (
    <section id="research" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-semibold">For Researchers</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Evidence-Based AI Security</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Our research demonstrates the critical need for MCP server isolation and the effectiveness of our sandboxing
              approach. Stay tuned with our latest findings.
            </p>
          </div>

          <div className="bg-muted p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-bold mb-4">Key Research Findings</h3>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-muted-foreground">
              <span className="font-semibold">Access Control Policy</span>
              <span>
                Introducing an access control policy mechanism for MCP servers, inspired by the Android permission model.
              </span>
              <span className="font-semibold">Effective Policy Generation</span>
              <span>
                Developers confirmed that our method of automatically generating permission manifests generates highly
                accurate results.
              </span>
              <span className="font-semibold">Security and Efficiency</span>
              <span>
                Effectively mitigate malicious behavor in MCP servers such as: data exfiltration and external resource
                attacks.
              </span>
            </div>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Performance Impact Analysis - Sandboxed vs Native Execution</CardTitle>
              <CardDescription>As shown, the sandbox is only 0.4ms slower than native execution</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Our evaluation shows that AgentBound - the security sandbox of GuardiAgent - does not imply a performance
                overhead. The introduced overhead is negligible in practice.
              </p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                The diagram shows the the comparison between the runtime of the four most prevalent MCP server operations,
                when executed with and without the sandbox, on two hardware environments, i.e., macOS and Debian. The sandbox
                adds, on average, across all operations, 0.6 ms on macOS and 0.29 ms on Debian, both essentially negligible.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-12">
            <Link href="/researchers">
              <Button
                size="lg"
                className="bg-secondary hover:bg-primary/90 text-secondary-foreground hover:text-primary-foreground cursor-pointer"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Get more details about our research
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
