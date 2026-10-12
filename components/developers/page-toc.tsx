import Link from 'next/link';

export const developerSections = [
  { id: 'status', label: 'Status' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'manifest', label: 'Manifest' },
  { id: 'runtime-permissions', label: 'Runtime permissions' },
  { id: 'containers', label: 'Containers' },
  { id: 'checklist', label: 'Checklist' },
];

// In-page navigation under the hero. Scrolls horizontally on small screens instead of widening the page.
export function PageToc() {
  return (
    <nav aria-label="On this page" className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto py-3 [mask-image:linear-gradient(to_right,black_85%,transparent)] md:[mask-image:none]">
          <span className="shrink-0 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            On this page
          </span>
          <ul className="flex shrink-0 gap-1">
            {developerSections.map((s) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  className="block rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
