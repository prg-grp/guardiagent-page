import { CopyToClipboardButton } from '@/components/copy-to-clipboard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image';

const citation = `@article{bühler2025securingaiagentexecution,
    title={Securing AI Agent Execution},
    author={Christoph Bühler and Matteo Biagiola and Luca Di Grazia and Guido Salvaneschi},
    year={2025},
    eprint={2510.21236},
    archivePrefix={arXiv},
    primaryClass={cs.CR},
    url={https://arxiv.org/abs/2510.21236},
}`;

export default function Researchers() {
  return (
    <>
      <section className="relative min-h-screen/2 flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-teal-900 to-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-8 animate-float">
              <div className="relative">
                <GraduationCap className="h-24 w-24 text-primary mx-auto" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 text-balance">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">GuardiAgent:</span>{' '}
              Securing Execution Boundaries of AI Agents
            </h1>

            <ol className="mb-6 flex justify-center space-x-4 text-slate-400">
              <li>Christoph Bühler</li>
              <li>Matteo Biagiola</li>
              <li>Luca Di Grazia</li>
              <li>Guido Salvaneschi</li>
            </ol>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
              Large language models have evolved into AI agents that interact with external tools and environments.
              GuardiAgent is the first access‑control framework for MCP servers, securing these interactions without
              compromising efficiency.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
      </section>
      <div className="content-grid">
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">Key Highlights</h2>
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="font-bold text-primary text-xl">Access Control Policy</CardHeader>
                <CardContent>
                  GuardiAgent introduces an access control policy mechanism for Model Context Protocol (MCP) servers,
                  inspired by the Android permission model. Permissions are specified via manifest files that express
                  required privileges.
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="font-bold text-primary text-xl">Policy Enforcement Engine</CardHeader>
                <CardContent>
                  Our evaluation shows that access control policies can be generated automatically for existing MCP servers
                  and are correct in most cases. Developers confirmed that 100&#37; of required permissions are captured and
                  that 80.9&#37; of the generated manifests need no human intervention.
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="font-bold text-primary text-xl">Security and Efficiency</CardHeader>
                <CardContent>
                  GuardiAgent's policy enforcement engine effectively mitigates malicious behaviours such as external
                  resource attacks and data exfiltration while introducing only a small runtime overhead. On average, it adds
                  about 0.6 ms per request, demonstrating that strong isolation can be achieved with negligible performance
                  cost.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">Why Securing AI Agents Matters</h2>
            <p>
              AI agents integrate large language models with external tools - file systems, databases, web APIs and more - to
              perform complex tasks. While tools use unlocks powerful capabilities, it also expands the attack surface.
              Thousands of MCP servers expose privileged operations without adequate isolation or permission checks. A
              malicious server can compel the agent, through prompt injection, to exfiltrate data, execute arbitrary code or
              misuse resources, as the agent inherits the full privileges of the host process.
            </p>
            <p>
              Unlike mature ecosystems that pair system permissions with enforced runtime behaviour, the MCP specification
              focuses only on the communication protocol. GuardiAgent closes this gap by bringing principled access control
              to the MCP servers. It guarantees that they comply with the manifest and blocks any unauthorised access,
              thereby preserving the boundary between the MCP server and the host system.
            </p>
          </div>
        </section>
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">How GuardiAgent Works</h2>
            <p>
              GuardiAgent enforces each MCP server with a manifest that declares the operations it can perform (e.g., read
              file, write file, fetch URL). At runtime, the policy enforcement engine guarantees the behaviour of the MCP
              server. Only calls that conform to the manifest are executed; all others are blocked, preventing capability
              escalation and data leakage.
            </p>
            <div className="text-center">
              <Image
                src="/framework.svg"
                alt="GuardiAgent framework architecture"
                width={1024}
                height={350}
                className="rounded inline-block"
              />
            </div>
            <p>
              To simplify adoption, GuardiAgent can automatically generate manifests from existing server source code. The
              MCP servers do not need any modifications to run with GuardiAgent. Developers can review and refine these
              manifests, but our study shows that the automatically generated policies are largely correct and approved by
              developers. This approach lowers the barrier to securing the vast ecosystem of MCP servers with limited human
              intervention.
            </p>
          </div>
        </section>
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">Evaluation &amp; Results</h2>
            <p>
              We evaluated GuardiAgent on a variety of real‑world MCP servers and malicious workloads. The framework
              demonstrates strong security guarantees and excellent performance
            </p>
            <Table>
              <TableCaption>List of experiments and results in our paper</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Experiment</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Automatic manifest accuracy</TableCell>
                  <TableCell>80.9&#37; of generated manifests are correct without manual adjustments</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Permission coverage</TableCell>
                  <TableCell>100&#37; of required permissions are captured by the policy vocabulary</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Security</TableCell>
                  <TableCell>
                    Successfully mitigates malicious behaviours such as external resource attacks and data exfiltration
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Performance overhead</TableCell>
                  <TableCell>&#126;0.5ms average per interaction</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p>
              These results indicate that GuardiAgent provides robust protection without sacrificing responsiveness. By
              injecting a lightweight enforcement layer, developers can adopt a least‑privilege security model for AI agents
              with minimal effort.
            </p>
          </div>
        </section>
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">Citation</h2>
            <p>If you find GuardiAgent useful in your research or projects, please consider citing our paper</p>
            <Card className="relative">
              <CardContent>
                <CopyToClipboardButton
                  textToCopy={citation}
                  className="absolute right-0 top-0 p-2 border-l border-b rounded-bl-lg transition-colors"
                  onCopiedTrueClassName="bg-primary text-primary-foreground border-primary"
                  onCopiedFalseClassName="bg-neutral-50 text-black border-neutral-200"
                />
                <pre>{citation}</pre>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
