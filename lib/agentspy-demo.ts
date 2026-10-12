import { demoResults } from '@/lib/agentspy-demo-data';

// Metadata for the AgentSpy report simulator. The results themselves are generated into agentspy-demo-data.ts
// from recorded executions; nothing runs in the browser.

export type DemoModelId = 'gpt-5.6-terra' | 'deepseek-v4-flash' | 'glm-5.3-flash';
export type DemoTaskId = 'citation-check' | '3d-scan-calc' | 'exceltable-in-ppt';

export const demoModels: { id: DemoModelId; provider: string; note: string }[] = [
  { id: 'gpt-5.6-terra', provider: 'OpenAI', note: 'Proprietary, mid tier of the GPT-5.6 family' },
  { id: 'deepseek-v4-flash', provider: 'DeepSeek', note: 'Open-weight Mixture-of-Experts' },
  { id: 'glm-5.3-flash', provider: 'Z.ai', note: 'Open-weight Mixture-of-Experts' },
];

export const demoTasks: {
  id: DemoTaskId;
  title: string;
  task: string;
  skills: { name: string; files: number; summary: string }[];
  tests: number;
}[] = [
  {
    id: 'citation-check',
    title: 'Find fake citations',
    task: 'A BibTeX file mixes real and fabricated references. Write the titles of the fabricated ones to answer.json.',
    skills: [
      {
        name: 'citation-management',
        files: 14,
        summary: 'How to validate references: resolve DOIs through Crossref, search Google Scholar and PubMed, check metadata. Ships six helper scripts.',
      },
    ],
    tests: 9,
  },
  {
    id: '3d-scan-calc',
    title: 'Weigh a 3D-printed part',
    task: 'Parse a binary STL scan, drop the scanning debris, read the material ID stored in each triangle and compute the part mass.',
    skills: [
      {
        name: 'mesh-analysis',
        files: 2,
        summary: 'A MeshAnalyzer tool that parses binary STL files and finds connected components.',
      },
    ],
    tests: 2,
  },
  {
    id: 'exceltable-in-ppt',
    title: 'Update a table inside slides',
    task: 'A PowerPoint file embeds an Excel table of exchange rates. Apply the new rate from a text box and keep every formula intact.',
    skills: [
      {
        name: 'xlsx',
        files: 3,
        summary: 'Rules for editing spreadsheets that keep formulas intact, plus a script that recalculates them.',
      },
      {
        name: 'pptx',
        files: 56,
        summary: 'How to read and edit presentations through their XML, with helper scripts and the file-format schemas.',
      },
    ],
    tests: 8,
  },
];

export type DemoResult = (typeof demoResults)[keyof typeof demoResults];

export function demoResult(model: DemoModelId, task: DemoTaskId): DemoResult {
  return demoResults[`${model}|${task}`];
}

// Reference values from the paper (gpt-5.6-terra over 77 tasks, §4.1): average set similarity of three runs of the
// same task, and of sets that mix in runs of a different task.
export const similarityReference = { sameTask: 0.6, mixedTasks: 0.3 };

export const demoHarness = 'codex CLI 0.146.0';
