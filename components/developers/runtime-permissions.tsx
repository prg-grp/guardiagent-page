import { Code } from '@/components/code';
import { InlineCode } from '@/components/developers/doc-link';
import dedent from 'dedent-js';
import type React from 'react';

type RuntimePermission = { signature: string; grants: React.ReactNode; requires: string };

const permissions: RuntimePermission[] = [
  {
    signature: 'FSAccess(path, container_path=None, read=True, write=False)',
    grants: (
      <>
        Mounts one file or directory, read-only unless <InlineCode>write=True</InlineCode>.
      </>
    ),
    requires: 'mcp.ac.filesystem.read, plus mcp.ac.filesystem.write when write=True',
  },
  {
    signature: 'EnvironmentVariable(name)',
    grants: 'Copies one variable, such as an API key, from your environment into the container.',
    requires: 'mcp.ac.system.env.read',
  },
  {
    signature: 'DomainPort(domain, port)',
    grants: 'Allows outbound TCP to a domain and port. The domain is resolved to IPv4 addresses once, at startup.',
    requires: 'mcp.ac.network.client',
  },
  {
    signature: 'HostPort(host, port)',
    grants: 'Allows outbound TCP to an IPv4 address and port.',
    requires: 'mcp.ac.network.client',
  },
];

const cols = 'md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_minmax(0,4fr)]';

export function RuntimePermissions() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-card shadow-sm">
        <div
          className={`hidden gap-6 border-b bg-muted/60 px-6 py-3 text-sm font-semibold text-muted-foreground md:grid ${cols}`}
          aria-hidden
        >
          <span>Class</span>
          <span>Grants</span>
          <span>Manifest must declare</span>
        </div>
        <ul className="divide-y">
          {permissions.map((p) => (
            <li key={p.signature} className={`grid min-w-0 grid-cols-1 gap-1.5 px-5 py-4 md:gap-6 md:px-6 ${cols}`}>
              <code className="font-mono text-[13px] font-semibold wrap-anywhere">{p.signature}</code>
              <p className="min-w-0 leading-relaxed text-muted-foreground">{p.grants}</p>
              <p className="min-w-0 text-sm">
                <span className="font-medium md:sr-only">Manifest must declare: </span>
                <code className="font-mono text-[13px] wrap-anywhere text-bound">{p.requires}</code>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-0 space-y-3">
        <p className="leading-relaxed">
          Each resource gets its own permission, and the manifest must declare every capability the list uses.
        </p>
        <Code
          className="rounded-lg p-3 text-xs leading-relaxed md:p-4 md:text-sm"
          lang="python"
          code={dedent`
            runtime_permissions=[
                FSAccess(os.path.abspath("./docs")),              # read-only
                FSAccess(os.path.abspath("./out"), write=True),   # read-write
                EnvironmentVariable("API_KEY"),
                DomainPort("api.example.com", 443),
            ]
          `}
        />
      </div>
    </div>
  );
}
