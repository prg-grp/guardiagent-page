import { Code } from '@/components/code';
import { CodeAnchor, DocLink, InlineCode } from '@/components/developers/doc-link';
import { agentBound } from '@/lib/papers';
import dedent from 'dedent-js';
import { ChevronDown } from 'lucide-react';

const zenodo = agentBound.links.find((l) => l.href.includes('zenodo'));
const generatedCorrect = agentBound.stats.find((s) => s.label.includes('judged correct'));

// Table 2 of the AgentBound paper. `sdk` names the runtime permission class of the Python SDK, where one exists.
const vocabulary: { category: string; items: { id: string; text: string; sdk?: string }[] }[] = [
  {
    category: 'Filesystem',
    items: [
      { id: 'mcp.ac.filesystem.read', text: 'Read files or directories', sdk: 'FSAccess' },
      { id: 'mcp.ac.filesystem.write', text: 'Write or create files', sdk: 'FSAccess(write=True)' },
      { id: 'mcp.ac.filesystem.delete', text: 'Delete files or directories' },
    ],
  },
  {
    category: 'System',
    items: [
      { id: 'mcp.ac.system.env.read', text: 'Read environment variables', sdk: 'EnvironmentVariable' },
      { id: 'mcp.ac.system.env.write', text: 'Set environment variables' },
      { id: 'mcp.ac.system.exec', text: 'Execute OS commands' },
      { id: 'mcp.ac.system.process', text: 'List, kill or interact with processes' },
    ],
  },
  {
    category: 'Network',
    items: [
      { id: 'mcp.ac.network.client', text: 'Outgoing network access', sdk: 'DomainPort, HostPort' },
      { id: 'mcp.ac.network.server', text: 'Accept incoming connections' },
      { id: 'mcp.ac.network.bluetooth', text: 'Use Bluetooth connections' },
    ],
  },
  {
    category: 'Peripherals',
    items: [
      { id: 'mcp.ac.peripheral.camera', text: 'Capture images or video' },
      { id: 'mcp.ac.peripheral.microphone', text: 'Record audio' },
      { id: 'mcp.ac.peripheral.speaker', text: 'Play audio' },
      { id: 'mcp.ac.peripheral.screen.capture', text: 'Screen capture' },
    ],
  },
  {
    category: 'Others',
    items: [
      { id: 'mcp.ac.location', text: 'Access location data' },
      { id: 'mcp.ac.notifications.post', text: 'Show system notifications' },
      { id: 'mcp.ac.clipboard.read', text: 'Read clipboard contents' },
      { id: 'mcp.ac.clipboard.write', text: 'Write to clipboard' },
    ],
  },
];

function Vocabulary() {
  return (
    <details className="group rounded-xl border bg-card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold md:px-5 [&::-webkit-details-marker]:hidden">
        Capability vocabulary (Table 2 of the AgentBound paper)
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="overflow-x-auto border-t">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th scope="col" className="px-4 py-2 font-semibold md:px-5">
                Capability
              </th>
              <th scope="col" className="hidden px-4 py-2 font-semibold sm:table-cell md:px-5">
                Python SDK class
              </th>
            </tr>
          </thead>
          {vocabulary.map((group) => (
            <tbody key={group.category}>
              <tr className="bg-muted/50">
                <th
                  scope="colgroup"
                  colSpan={2}
                  className="px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase md:px-5"
                >
                  {group.category}
                </th>
              </tr>
              {group.items.map((item) => (
                <tr key={item.id} className="border-b last:border-b-0 align-top">
                  <td className="min-w-0 px-4 py-2 md:px-5">
                    <code className="block font-mono text-[13px] font-medium wrap-anywhere">{item.id}</code>
                    <span className="block text-muted-foreground">{item.text}</span>
                    {/* Phones: the SDK class sits under the capability instead of in its own column. */}
                    {item.sdk && (
                      <span className="block sm:hidden">
                        Python SDK: <code className="font-mono text-[13px] wrap-anywhere text-bound">{item.sdk}</code>
                      </span>
                    )}
                  </td>
                  <td className="hidden px-4 py-2 sm:table-cell md:px-5">
                    {item.sdk ? (
                      <code className="font-mono text-[13px] wrap-anywhere text-bound">{item.sdk}</code>
                    ) : (
                      <span className="text-muted-foreground">none</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </details>
  );
}

export function ManifestSection() {
  return (
    <div className="space-y-6 leading-relaxed">
      <Code
        className="rounded-lg p-3 text-xs leading-relaxed md:p-4 md:text-[13px]"
        lang="json"
        code={dedent`
          {
            "name": "Filesystem Server",
            "description": "A server that accesses the local filesystem and allows interaction with all sorts of files.",
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <p className="min-w-0">
          The registry (<InlineCode>npm</InlineCode> or <InlineCode>pypi</InlineCode>) decides which container image
          starts. The <CodeAnchor anchor="manifest-permissions">permissions</CodeAnchor> name kinds of access, not
          resources: <InlineCode>mcp.ac.filesystem.write</InlineCode> means the server writes to some directory, and the
          user grants a specific one at launch.
        </p>
        <p className="min-w-0">
          The policy is default-deny: a capability the manifest does not declare cannot be granted. In the prototype,
          only capabilities with a runtime permission class are enforced at a fine grain, and a read-write mount also
          allows deletion.
        </p>
      </div>
      <Vocabulary />
      <p className="text-sm text-muted-foreground">
        To draft manifests for existing servers, the paper&apos;s AgentManifestGen reads a server&apos;s source code;
        responding maintainers judged {generatedCorrect?.value ?? '80.9%'} of its manifests correct (§4.1.3). The
        prompts are in the{' '}
        {zenodo ? (
          <DocLink href={zenodo.href} className="font-medium text-primary underline-offset-4 hover:underline">
            replication package
          </DocLink>
        ) : (
          'replication package'
        )}
        .
      </p>
    </div>
  );
}
