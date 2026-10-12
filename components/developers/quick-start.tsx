import { Code } from '@/components/code';
import { CodeAnchor, InlineCode } from '@/components/developers/doc-link';
import dedent from 'dedent-js';

// Smaller type and padding on phones so more of each line is visible before the block scrolls.
const codeClass = 'rounded-lg p-3 text-xs leading-relaxed md:p-4 md:text-sm';

export function QuickStart() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-2">
          <h3 className="mb-3 text-xl font-semibold">Prerequisites</h3>
          <ul className="ml-5 list-disc space-y-1.5 leading-relaxed">
            <li>Python 3.10 or later</li>
            <li>Docker, installed and running</li>
            <li>
              <InlineCode>uv</InlineCode> (optional)
            </li>
            <li>An OpenAI API key for the example agent</li>
          </ul>
        </div>
        <div className="min-w-0 lg:col-span-3">
          <h3 className="mb-3 text-xl font-semibold">Install</h3>
          <Code
            className={codeClass}
            lang="bash"
            code={[
              'uv init',
              'uv add openai-agents',
              'uv add \\',
              '  https://github.com/GuardiAgent/python-mcp-sandbox-openai-sdk.git',
            ]}
          />
        </div>
      </div>

      <div className="min-w-0 space-y-4 leading-relaxed">
        <h3 className="text-xl font-semibold">Walk-through</h3>
        <p>The example runs the official Filesystem MCP server in the sandbox and asks an agent to list a directory.</p>
        <Code
          className={codeClass}
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
                description="A server that accesses the local filesystem and allows interaction with all sorts of files.",
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
                        Do not descend recursively.
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
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <CodeAnchor anchor="hello-world-manifest">Lines 14 to 24</CodeAnchor> declare the manifest. Few servers ship
            one yet, so you write it yourself or load a JSON file with <InlineCode>MCPManifest.from_file(path)</InlineCode>.
          </li>
          <li>
            <CodeAnchor anchor="hello-world-sandboxmcp">Lines 29 to 33</CodeAnchor> use{' '}
            <InlineCode>SandboxedMCPStdio</InlineCode> in place of the SDK&apos;s <InlineCode>MCPServerStdio</InlineCode>.
            It rejects runtime permissions the manifest does not cover, asks the user to approve the rest, and turns the
            approved ones into mounts, an egress allow list and environment variables of the container.
          </li>
        </ul>
        <p>The consent prompt looks like this:</p>
        <Code
          className={codeClass}
          wrap
          lang="asciidoc"
          code={dedent`
            Runtime Permission: File System Access Permission
            Allow access to file system path: .../example (read: True, write: False)
            Do you want to give the agent the requested access? (yes/no):
          `}
        />
        <p>
          <InlineCode>FSAccess</InlineCode> is read-only by default, so the prompt shows{' '}
          <InlineCode>write: False</InlineCode> although the manifest declares write access. If the user answers no, the
          directory is not mounted.
        </p>
      </div>
    </div>
  );
}
