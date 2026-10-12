import { authors } from '@/lib/papers';
import { ExternalLink } from 'lucide-react';

export function Team() {
  return (
    <div>
      <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {authors.map((author) => (
          <li key={author.name} className="border-t pt-4">
            <p className="font-semibold sm:text-lg">{author.name}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{author.affiliation}</p>
          </li>
        ))}
      </ul>
      <a
        href="https://programming-group.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Programming Group, University of St. Gallen in Switzerland
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </a>
    </div>
  );
}
