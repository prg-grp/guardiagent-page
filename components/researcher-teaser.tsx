import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, GraduationCap } from 'lucide-react';
import PerformanceChart from './research/performance-chart';

// const threatData = [
//   { month: 'Jan', incidents: 12, blocked: 11 },
//   { month: 'Feb', incidents: 19, blocked: 18 },
//   { month: 'Mar', incidents: 27, blocked: 26 },
//   { month: 'Apr', incidents: 34, blocked: 33 },
//   { month: 'May', incidents: 41, blocked: 40 },
//   { month: 'Jun', incidents: 38, blocked: 37 },
// ];

// const attackTypes = [
//   { name: 'Data Exfiltration', value: 35, color: '#ef4444' },
//   { name: 'Tool Poisoning', value: 28, color: '#f59e0b' },
//   { name: 'Resource Abuse', value: 22, color: '#06b6d4' },
//   { name: 'Privilege Escalation', value: 15, color: '#8b5cf6' },
// ];

const performanceData = [
  { metric: 'Latency Overhead', baseline: 100, agentshield: 103 },
  { metric: 'Memory Usage', baseline: 100, agentshield: 108 },
  { metric: 'Throughput', baseline: 100, agentshield: 98 },
];

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
              approach.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Threat Detection Over Time
                </CardTitle>
                <CardDescription>
                  [CONTENT: Analysis of AI agent security incidents detected and blocked by AgentShield over a 6-month
                  deployment period across enterprise customers]
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={threatData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="incidents" stroke="#ef4444" name="Incidents Detected" />
                    <Line type="monotone" dataKey="blocked" stroke="#0f766e" name="Successfully Blocked" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}

            {/* <Card>
              <CardHeader>
                <CardTitle>Attack Vector Distribution</CardTitle>
                <CardDescription>
                  [CONTENT: Breakdown of attack types observed in production environments, showing the prevalence of
                  different threat categories in AI agent deployments]
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attackTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {attackTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Performance Impact Analysis</CardTitle>
              <CardDescription>
                <PerformanceChart />
                [CONTENT: Comparative performance metrics showing minimal overhead of AgentShield sandboxing versus baseline
                unsecured execution. Data from controlled benchmarks.]
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                [CONTENT: Interpretation of results showing that AgentShield introduces less than 5% performance overhead
                while providing comprehensive security guarantees]
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Research Paper</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  [CONTENT: Abstract of the academic paper describing the threat model, sandboxing architecture, formal
                  security proofs, and experimental validation]
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Threat Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  [CONTENT: Detailed threat taxonomy for AI agents including adversarial MCP servers, compromised
                  dependencies, and insider threats. Formal definitions.]
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  View Model
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Benchmark Suite</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  [CONTENT: Open-source benchmark suite for evaluating AI agent security solutions. Includes attack
                  scenarios, performance tests, and evaluation metrics]
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  Access Suite
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Key Research Findings</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  [CONTENT: Finding 1 - Percentage of AI agent deployments vulnerable to data exfiltration attacks]
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>[CONTENT: Finding 2 - Effectiveness rate of sandboxing in preventing tool poisoning attacks]</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>[CONTENT: Finding 3 - Performance overhead comparison with other isolation techniques]</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>[CONTENT: Finding 4 - Time-to-detection metrics for various attack patterns]</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <GraduationCap className="mr-2 h-5 w-5" />
              Subscribe to Research Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
