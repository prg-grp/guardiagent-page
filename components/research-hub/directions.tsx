import { PillarIcon, pillarMeta, type Pillar } from '@/components/pillar-badge';
import { cn } from '@/lib/utils';

// Only extensions and open problems the papers state themselves, with their sections.
const directions: Record<Pillar, string[]> = {
  bound: [
    'Privacy management for agents deployed in organizations, with permissions inherited from the employee who invokes the agent (§7).',
    'Finer control of devices, location, clipboard and notifications through a trusted companion application (§3.3).',
    'Separating required from optional capabilities, as some server maintainers suggested (§4.1.3).',
    'Hardening the Docker runtime with AppArmor or SELinux (§5).',
  ],
  spy: [
    'Task-specific rules for harm inside the workspace, such as a new Git remote in a task with no reason to add one (§4.3).',
    'Further analyses of obligations or prohibitions over the same observation boundary (§3.3).',
    'Other harnesses, models and datasets: all experiments used codex, and results may differ elsewhere (§4.5).',
  ],
};

export function Directions() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      {(['bound', 'spy'] as const).map((pillar) => (
        <div key={pillar}>
          <h4
            className={cn(
              'mb-3 flex items-center gap-1.5 text-sm font-semibold',
              pillar === 'bound' ? 'text-bound' : 'text-spy'
            )}
          >
            <PillarIcon pillar={pillar} className="h-4 w-4" />
            {pillarMeta[pillar].name}
          </h4>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {directions[pillar].map((text) => (
              <li key={text.slice(0, 40)}>{text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
