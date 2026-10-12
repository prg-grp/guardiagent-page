'use server';

import {
  createCommentNotationTransformer,
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import { cn } from '@/lib/utils';
import type { BundledLanguage, BundledTheme } from 'shiki';
import { codeToHtml } from 'shiki';

type CodeBlocksProps = {
  code: string | string[];
  showLineNumbers?: boolean;
  className?: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
  wrap?: boolean;
};

const anchorTransformer = createCommentNotationTransformer(
  'anchorTransformer',
  new RegExp(`\\s*\\[!code anchor=(.*)]`),
  function (match, line, _commentNode, _lines, _index) {
    const anchor = match[1];
    line.properties['id'] = anchor;
    line.properties['class'] = line.properties['class'] + ' scroll-mt-20';

    return true;
  },
  undefined
);

export async function Code({
  code,
  className,
  showLineNumbers = false,
  lang = 'javascript',
  theme = 'dark-plus',
  wrap = false,
}: CodeBlocksProps) {
  const codes = typeof code === 'string' ? [code] : code;
  const html = await codeToHtml(codes.join('\n'), {
    lang,
    theme,
    transformers: [transformerNotationDiff(), transformerNotationHighlight(), anchorTransformer],
  });
  return (
    <div className={cn('max-w-full bg-[#1e1e1e]', className)}>
      <div
        className={cn(
          'w-full overflow-auto',
          showLineNumbers && 'line-numbers',
          wrap && '[&_pre]:whitespace-pre-wrap [&_pre]:wrap-break-word'
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}
