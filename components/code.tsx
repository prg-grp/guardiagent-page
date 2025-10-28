'use server';

import {
  createCommentNotationTransformer,
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import type { BundledLanguage, BundledTheme } from 'shiki';
import { codeToHtml } from 'shiki';

type CodeBlocksProps = {
  code: string | string[];
  showLineNumbers?: boolean;
  className?: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
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
}: CodeBlocksProps) {
  const codes = typeof code === 'string' ? [code] : code;
  const html = await codeToHtml(codes.join('\n'), {
    lang,
    theme,
    transformers: [transformerNotationDiff(), transformerNotationHighlight(), anchorTransformer],
  });
  return (
    <div className={`bg-[#1e1e1e] max-w-full ${className}`}>
      <div
        className={`overflow-auto w-full ${showLineNumbers ? 'line-numbers' : ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}
