'use client';

import { DiagramMode, TwoBoundariesDiagram, TwoBoundariesStacked } from '@/components/two-boundaries-diagram';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';

const captions: Record<DiagramMode, string> = {
  both: 'Both layers together. P is blocked, O is recorded with two alerts, G passes both.',
  prevent:
    'AgentBound stops P at the sandbox wall, before the connection happens. O never touches an MCP server, so it passes unbounded.',
  observe:
    'AgentSpy records O end to end and raises two alerts. The attack completes inside the disposable VM: AgentSpy does not block anything.',
  gaps: 'G stays inside every declared permission and every allowed host. Neither layer flags it: this is the "semantic gap" named in the AgentBound paper.',
};

const itemClass = 'cursor-pointer px-4 data-[state=on]:bg-slate-900 data-[state=on]:text-white';

export function TwoBoundariesInteractive() {
  const [mode, setMode] = useState<DiagramMode>('both');

  return (
    <div>
      <div className="mb-4 hidden flex-wrap items-center justify-between gap-4 md:flex">
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(value) => value && setMode(value as DiagramMode)}
          variant="outline"
          aria-label="Highlight a layer"
        >
          <ToggleGroupItem value="both" className={itemClass}>
            Both
          </ToggleGroupItem>
          <ToggleGroupItem value="prevent" className={itemClass}>
            Prevent
          </ToggleGroupItem>
          <ToggleGroupItem value="observe" className={itemClass}>
            Observe
          </ToggleGroupItem>
          <ToggleGroupItem value="gaps" className={itemClass}>
            Gaps
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="max-w-xl text-sm text-muted-foreground" aria-live="polite">
          {captions[mode]}
        </p>
      </div>
      <TwoBoundariesDiagram mode={mode} className="hidden md:block" />
      <TwoBoundariesStacked className="md:hidden" />
    </div>
  );
}
