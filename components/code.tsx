'use server';

import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers';
import type { BundledLanguage, BundledTheme } from 'shiki';
import { codeToHtml } from 'shiki';

type CodeBlocksProps = {
  code: string | string[];
  className?: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
};

const shikiBgColor = '#1e1e1e';

export async function Code({ code, className, lang = 'javascript', theme = 'dark-plus' }: CodeBlocksProps) {
  const codes = typeof code === 'string' ? [code] : code;
  const html = await codeToHtml(codes.join('\n'), {
    lang,
    theme,
    transformers: [transformerNotationDiff(), transformerNotationHighlight()],
  });
  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ backgroundColor: shikiBgColor }}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}
