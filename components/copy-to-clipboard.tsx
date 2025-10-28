'use client';

import { useState } from 'react';

export const CopyToClipboardButton = ({
  textToCopy,
  className,
  onCopiedTrueClassName,
  onCopiedFalseClassName,
}: {
  textToCopy: string;
  className?: string;
  onCopiedTrueClassName?: string;
  onCopiedFalseClassName?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      className={`cursor-pointer ${className} ${copied ? onCopiedTrueClassName : onCopiedFalseClassName}`}
      onClick={handleCopy}
    >
      Copy
    </button>
  );
};
