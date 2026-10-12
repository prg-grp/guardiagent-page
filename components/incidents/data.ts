import { incidents, type Incident, type Setting } from '@/lib/incidents';

// Shared by the server sections and the client explorer. Keep this module free of 'use client'
// so server components can read the values directly.

export type SettingGroupId = 'use' | 'lab' | 'research';

export const settingGroups: { id: SettingGroupId; label: string; settings: Setting[] }[] = [
  { id: 'use', label: 'Production and internal use', settings: ['production', 'internal-deployment', 'internal-mixed'] },
  { id: 'lab', label: 'Training and evaluation', settings: ['training', 'evaluation', 'third-party-evaluation'] },
  { id: 'research', label: 'Studies and security research', settings: ['simulated', 'security-research'] },
];

const byId = new Map(incidents.map((i) => [i.id, i]));

// Fails the build when a hand-picked example id no longer exists in lib/incidents.ts.
export function getIncident(id: string): Incident {
  const incident = byId.get(id);
  if (!incident) throw new Error(`Unknown incident id "${id}" in components/incidents`);
  return incident;
}
