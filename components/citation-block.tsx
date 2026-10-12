import { CopyToClipboardButton } from '@/components/copy-to-clipboard';
import { cn } from '@/lib/utils';

export function CitationBlock({ bibtex, className }: { bibtex: string; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-slate-800 bg-slate-950 text-slate-100', className)}>
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">BibTeX</span>
        <CopyToClipboardButton
          textToCopy={bibtex}
          className="rounded-md border px-3 py-1 text-sm transition-colors"
          onCopiedTrueClassName="bg-primary text-primary-foreground border-primary"
          onCopiedFalseClassName="bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700"
        />
      </div>
      <pre className="p-4 text-xs leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere] md:p-5 md:text-sm">
        <code>{bibtex}</code>
      </pre>
    </div>
  );
}
