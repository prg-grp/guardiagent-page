import { InlineCode } from '@/components/developers/doc-link';
import { TriangleAlert } from 'lucide-react';
import type React from 'react';

const variables: { name: string; body: React.ReactNode }[] = [
  {
    name: 'RUNTIME',
    body: (
      <>
        <InlineCode>pypi</InlineCode> or <InlineCode>npm</InlineCode>.
      </>
    ),
  },
  { name: 'PACKAGE', body: 'The MCP server package to install from that registry.' },
  {
    name: 'EXE',
    body: (
      <>
        The command that starts the server. Set automatically unless <InlineCode>PRE_INSTALLED</InlineCode> is set.
      </>
    ),
  },
  {
    name: 'PRE_INSTALLED',
    body: (
      <>
        Skip installation and run a server already in the image or mounted at <InlineCode>/sandbox</InlineCode> (set by{' '}
        <InlineCode>DevMCPManifest</InlineCode>). Requires <InlineCode>EXE</InlineCode>.
      </>
    ),
  },
  {
    name: 'ALLOWED_EGRESS',
    body: (
      <>
        <InlineCode>host:port</InlineCode> or <InlineCode>ip:port</InlineCode> entries for outbound TCP, filled from the
        approved <InlineCode>DomainPort</InlineCode> and <InlineCode>HostPort</InlineCode> permissions. Empty by default.
      </>
    ),
  },
  {
    name: 'EXTRA_DNS',
    body: (
      <>
        Resolvers to allow in addition to those in <InlineCode>/etc/resolv.conf</InlineCode>.
      </>
    ),
  },
  {
    name: 'ALLOW_LOOPBACK',
    body: (
      <>
        Loopback traffic. <InlineCode>1</InlineCode> by default, <InlineCode>0</InlineCode> disables it.
      </>
    ),
  },
];

export function ContainersSection() {
  return (
    <div className="space-y-6">
      <p className="max-w-3xl leading-relaxed">
        The entry point installs the package before it sets the iptables rules, so installation runs without network
        restrictions. The server then starts as <InlineCode>mcpuser</InlineCode>, and the rules drop all traffic except
        loopback, established connections, DNS to the allowed resolvers and outbound TCP to the{' '}
        <InlineCode>ALLOWED_EGRESS</InlineCode> entries.
      </p>

      <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
        <table className="w-full text-left">
          <caption className="sr-only">Configuration variables of the sandbox container</caption>
          <thead className="border-b bg-muted/60 text-sm text-muted-foreground">
            <tr>
              <th scope="col" className="py-3 pr-2 pl-3 font-semibold md:px-6">
                Variable
              </th>
              <th scope="col" className="py-3 pr-3 pl-2 font-semibold md:px-6">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody className="divide-y align-top">
            {variables.map((v) => (
              <tr key={v.name}>
                <th scope="row" className="py-3 pr-2 pl-3 font-normal md:w-52 md:px-6">
                  {/* Names stay on one line; the meaning column takes the remaining width on phones. */}
                  <code className="font-mono text-xs font-semibold whitespace-nowrap md:text-[13px]">{v.name}</code>
                </th>
                <td className="py-3 pr-3 pl-2 text-sm leading-relaxed text-muted-foreground md:px-6 md:text-base">
                  {v.body}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div role="note" className="flex min-w-0 gap-3 rounded-2xl border border-alert/40 bg-alert/10 p-5">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-alert" aria-hidden />
        <p className="min-w-0 leading-relaxed">
          <span className="font-semibold">DNS stays reachable.</span> Queries to every resolver in{' '}
          <InlineCode>/etc/resolv.conf</InlineCode> and <InlineCode>EXTRA_DNS</InlineCode> are allowed even with an empty{' '}
          <InlineCode>ALLOWED_EGRESS</InlineCode>, so a server can encode data in lookups. Restrict the resolvers at the
          host or network level if that matters.
        </p>
      </div>
    </div>
  );
}
