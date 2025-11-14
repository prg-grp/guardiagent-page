import { Code } from '@/components/code';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dedent from 'dedent-js';
import { Code as CodeIcon, HeartCrack, Link as LinkIcon, ScanEye, ShieldAlert, UserCheck } from 'lucide-react';
import Link from 'next/link';

const CodeAnchor = ({ anchor, children }: { anchor: string; children: React.ReactNode }) => (
  <Link href={`#${anchor}`} className="underline decoration-primary decoration-2">
    {children}
  </Link>
);

export default function Devs() {
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
                <CodeIcon className="h-24 w-24 text-primary mx-auto" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
              How to use{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">AgendBound</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
              Use the GuardiAgent Framework to secure your AI Agent. Encapsulate the least common denominator in agentic
              software: the MCP server.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
      </section>
      <div className="content-grid">
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">Attack on Titan</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <HeartCrack className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Prevent Mistakes</CardTitle>
                </CardHeader>
                <CardContent>
                  Even well-intentioned MCP servers can contain bugs that lead to unintended consequences. GuardiAgent's
                  sandbox ensures that configuration errors, coding mistakes, or unexpected behavior can't escalate into
                  system-wide issues. Catch problems before they impact your production environment.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-xl font-semibold">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <ShieldAlert className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Prevent Attacks</CardTitle>
                </CardHeader>
                <CardContent>
                  Malicious actors can compromise MCP servers to exfiltrate data, inject code, or abuse system resources.
                  GuardiAgent provides defense-in-depth by isolating each server in a containerized sandbox, preventing
                  attackers from pivoting to other parts of your infrastructure even if a server is compromised.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-xl font-semibold">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <ScanEye className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Limit Access</CardTitle>
                </CardHeader>
                <CardContent>
                  Apply the principle of least privilege to your AI agents. Define granular permissions that specify exactly
                  what files, directories, and network resources each MCP server can access. No more giving blanket access to
                  your entire filesystem or network.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-xl font-semibold">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Users Consent</CardTitle>
                </CardHeader>
                <CardContent>
                  Put your users in control of their data. GuardiAgent prompts for explicit consent before granting runtime
                  permissions, ensuring users understand and approve what their AI agents can access. Build trust through
                  transparency and give users the final say on sensitive access.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">Quick Start</h2>
            <p>
              To use the GuardiAgent Security Sandbox, use the following quick start steps. GuardiAgent is not dependent on a
              specific AI framework, it works with all SDKs. However, this quickstart shows how to use GuardiAgent with the
              OpenAI Agent SDK. Currently, we support the OpenAI Agent SDK out of the box with an SDK specific
              implementation.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="https://github.com/guardiAgent/docker-mcp-sandbox/" target="_blank" className="flex">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-primary/90 ext-secondary-foreground hover:text-primary-foreground cursor-pointer text-lg"
                >
                  <LinkIcon className="w-5 h-6 mr-2" />
                  Sandbox
                </Button>
              </Link>
              <Link href="https://github.com/GuardiAgent/python-mcp-sandbox-openai-sdk" target="_blank" className="flex">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-primary/90 ext-secondary-foreground hover:text-primary-foreground cursor-pointer text-lg"
                >
                  <LinkIcon className="w-5 h-6 mr-2" />
                  GuardiAgent OpenAI Agent SDK
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Prerequisities</h3>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    To create and run this hello world example with an AI agent, make sure you have the following tools and
                    runtimes installed:
                  </p>
                  <ul className="list-disc ml-8 space-y-2">
                    <li>Python &gt; 3.10</li>
                    <li>Docker</li>
                    <li>Optionally, but recommended: &quot;uv&quot; - the Python package manager</li>
                    <li>OpenAI API Key</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Project Setup</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    To setup a new project and use the openAI Agent SDK, you'll need to initialize the project and add its
                    dependencies.
                  </p>
                  <Code
                    className="p-4 rounded-lg"
                    lang="bash"
                    code={[
                      'uv init',
                      'uv add openai-agents',
                      'uv add https://github.com/GuardiAgent/python-mcp-sandbox-openai-sdk.git',
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Walk-through Example</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Below, there is a ready to run example (with an OpenAI API key), that utilizes the sandbox to encapsulate
                  the official Filesystem MCP server.
                </p>
                <Code
                  className="p-4 rounded-lg"
                  showLineNumbers
                  lang="python"
                  code={dedent`
                    import os

                    from agents import Agent, Runner

                    from mcp_sandbox_openai_sdk import (
                        FSAccess,
                        MCPManifest,
                        MCPServers,
                        Permission,
                        Registry,
                        SandboxedMCPStdio,
                    )

                    manifest = MCPManifest( #[!code anchor=hello-world-manifest]
                        name="Filesystem Server",
                        description="A server that access the local filesystem and allows interaction with all sorts of files.",
                        registry=Registry.NPM,
                        package_name="@modelcontextprotocol/server-filesystem",
                        permissions=[
                            Permission.MCP_AC_FILESYSTEM_READ,
                            Permission.MCP_AC_FILESYSTEM_WRITE,
                            Permission.MCP_AC_FILESYSTEM_DELETE,
                        ],
                    )


                    async def main():
                        async with MCPServers(
                            SandboxedMCPStdio( #[!code anchor=hello-world-sandboxmcp]
                                manifest=manifest,
                                runtime_args=[os.path.abspath("./")],
                                runtime_permissions=[FSAccess(os.path.abspath("./"))],
                            )
                        ) as servers:
                            agent = Agent(
                                name="MCP Sandbox Test",
                                model="gpt-5-mini",
                                mcp_servers=servers,
                            )

                            prompt = f"""
                                Read the files in the {os.path.abspath("./")} directory and
                                list all the found files and directories of the first level.
                                Do not decend recursively.
                                Use the provided mcp servers to access the filesystem.
                            """
                            result = await Runner.run(
                                agent,
                                input=prompt,
                            )
                            print(result.final_output)


                    if __name__ == "__main__":
                        import asyncio

                        print("Execute Sandbox Demo")
                        asyncio.run(main())
                    `}
                />
                <h4 className="font-semibold">Deep-Dive</h4>
                <p className="text-justify">
                  <CodeAnchor anchor="hello-world-manifest">Lines 14 - 24</CodeAnchor> show how an MCP security manifest can
                  be created inside your own code. The manifests should be part of the MCP server implementation, but since
                  the practice is not yet widespread, you may also create the manifest inside your own code. The manifest (as
                  described below), allows the engineer of an MCP server to define what general intentions the MCP server has
                  - like an Android or iPhone app.
                </p>
                <p className="text-justify">
                  <CodeAnchor anchor="hello-world-sandboxmcp">Lines 29 - 33</CodeAnchor> are the heart of the SDK. Instead of
                  using the <code>MCPServerStdio</code> from the OpenAI Agent SDK directly, you must use our wrapper class.
                  This wrapper has the following functions:
                </p>
                <ol className="list-disc ml-8 space-y-2">
                  <li>
                    Takes a list of <code>runtime permissions</code>
                  </li>
                  <li>Validates the runtime permissions against the defined manifest permissions</li>
                  <li>
                    Asks the user for consent for each runtime permission (e.g. for specific file access to a directory)
                  </li>
                  <li>Uses Docker to start the MCP server sandboxed with the acknowledged permissions attached</li>
                </ol>
                <p className="text-justify">
                  As soon as the <code>async with</code> statement starts the MCP server(s), the user will be asked for each
                  runtime permission, if they want to allow the access or not. This currently happens on the shell and looks
                  like this:
                </p>
                <Code
                  className="p-4 rounded-lg"
                  lang="asciidoc"
                  code={dedent`
                  Runtime Permission: File System Access Permission
                  Allow access to file system path: .../example (read: True, write: False)
                  Do you want to give the agent the requested access? (yes/no):
                `}
                />
                <p>Depending on your answer, the example agent will have access or not.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">The Security Manifest</h2>
            <p>
              One key ingredient of the GuardiAgent framework is the security manifest (in our research, we call it the
              policy). It is a JSON file, that is bundled together with the MCP server that defines what general intentions
              an MCP server may have. This defines overarching intentions like file-access or internet access. It is inspired
              by the Android Permissions Manifest for apps.
            </p>
            <Card>
              <CardHeader>
                <h3>What a manifest looks like</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Code
                  className="p-4 rounded-lg"
                  lang="json"
                  code={dedent`
                  {
                    "name": "Filesystem Server",
                    "description": "A server that access the local filesystem and allows interaction with all sorts of files.",
                    "registry": "npm",
                    "package_name": "@modelcontextprotocol/server-filesystem",
                    "permissions": [ //[!code anchor=manifest-permissions]
                      "mcp.ac.filesystem.read",
                      "mcp.ac.filesystem.write",
                      "mcp.ac.filesystem.delete"
                    ]
                  }
                `}
                />
                <p>
                  The manifest contains a description of the server and on which package system it runs. Based on the package
                  system, the runtime is inferred. The{' '}
                  <CodeAnchor anchor="manifest-permissions">list of permissions</CodeAnchor> defines what general intentions
                  an MCP server has. This does not mean that the server will have read and write access to your whole system,
                  just that it does require read and write to <i>some</i> directories to function properly.
                </p>
                <Code
                  className="p-4 rounded-lg"
                  lang="python"
                  code={dedent`
                    SandboxedMCPStdio(
                        manifest=manifest,
                        runtime_args=[os.path.abspath("./")],
                        runtime_permissions=[FSAccess(os.path.abspath("./"))],
                    )
                    `}
                />
                <p>
                  The manifest, in conjunction with the custom wrapper ensures that the server only has the least possible
                  privileges. In the example above, the filesystem manifest is used to start the MCP server. Then the server
                  receives runtime arguments (implementation detail, the server needs to know where the files are). Finally,
                  the runtime permissions - if consented by the user - are the effective permissions that the server will
                  receive.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">Runtime Permissions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent>
                  <h3 className="font-semibold inline-block">FSAccess</h3> - Grant read/write access to specific filesystem
                  paths. Define exactly which directories or files an MCP server can interact with.
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h3 className="font-semibold inline-block">EnvironmentVariable</h3> - Allow access to specific environment
                  variables by name. Control which configuration values the server can read.
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h3 className="font-semibold inline-block">DomainPort</h3> - Enable network access to specific domains and
                  ports. Restrict outbound connections to approved external services.
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h3 className="font-semibold inline-block">HostPort</h3> - Allow network access to IP addresses and ports.
                  Define precise network endpoints the server can communicate with.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section>
          <div className="content container max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-center text-4xl">Sandboxed Container Images</h2>
            <p>
              The sandbox currently works with Docker underneath. There is a base image that you can use to create your own
              customized runtime image. The custom entrypoint performs the following tasks:
            </p>
            <ol className="list-decimal ml-4 space-y-2">
              <li>Check setup variables</li>
              <li>Download and setup the server package</li>
              <li>Check hostnames and setup iptables</li>
              <li>Execute the MCP server</li>
            </ol>
            <p>The following configuration environment variables are available during setup:</p>
            <ul className="list-disc ml-8 space-y-2">
              <li>
                <code>PRE_INSTALLED</code>: Skip package installation and use a pre-installed/mounted MCP server. Requires{' '}
                <code>EXE</code> to be set.
              </li>
              <li>
                <code>RUNTIME</code>: Specifies the package manager runtime, either &quot;pypi&quot; for Python packages or
                &quot;npm&quot; for Node.js packages.
              </li>
              <li>
                <code>PACKAGE</code>: The name of the MCP server package to install from the specified registry (npm or
                PyPI).
              </li>
              <li>
                <code>EXE</code>: The command to execute the MCP server. Required when <code>PRE_INSTALLED</code> is set,
                otherwise auto-configured.
              </li>
              <li>
                <code>ALLOWED_EGRESS</code>: Space or comma-separated list of allowed outbound connections in
                &quot;host:port&quot; or &quot;ip:port&quot; format. Empty by default (no outbound access).
              </li>
              <li>
                <code>EXTRA_DNS</code>: Additional DNS servers to allow for resolution beyond those in /etc/resolv.conf.
              </li>
              <li>
                <code>ALLOW_LOOPBACK</code>: Enable loopback traffic (localhost). Defaults to &quot;1&quot; (enabled). Set to
                &quot;0&quot; to disable.
              </li>
            </ul>
            <p>
              Note that after the download of the server package from the official package repository, only outbound
              connections allowed by DOMAIN/PORT or IP/PORT are possible. IPTABLES will block everything else.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
