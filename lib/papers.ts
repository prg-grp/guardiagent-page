// Single source of truth for paper metadata, links, citations and headline numbers.
// Every number carries the paper section it comes from. Do not add numbers that are not in the papers.

export type Author = { name: string; affiliation: string };

export const authors: Author[] = [
  { name: 'Christoph Bühler', affiliation: 'University of St. Gallen' },
  { name: 'Matteo Biagiola', affiliation: 'University of St. Gallen & Università della Svizzera italiana (USI)' },
  { name: 'Luca Di Grazia', affiliation: 'University of St. Gallen' },
  { name: 'Guido Salvaneschi', affiliation: 'University of St. Gallen' },
];

export const authorLine = authors.map((a) => a.name).join(', ');

export type PaperStat = { value: string; label: string; source: string; highlight?: boolean };
export type PaperLink = { label: string; href: string };

export type Paper = {
  id: 'agentbound' | 'agentspy';
  name: string;
  title: string;
  mode: 'Prevent' | 'Observe';
  boundary: string;
  status: string;
  venue: string;
  venueShort: string;
  date: string;
  href: string;
  oneLiner: string;
  thesis: string;
  links: PaperLink[];
  codeStatus?: string;
  bibtex: string;
  stats: PaperStat[];
};

export const agentBound: Paper = {
  id: 'agentbound',
  name: 'AgentBound',
  title: 'AgentBound: Securing Execution Boundaries of AI Agents',
  mode: 'Prevent',
  boundary: 'Tool boundary',
  status: 'Peer-reviewed',
  venue: 'Proceedings of the ACM on Software Engineering, Vol. 3, FSE, Article FSE096 (FSE 2026, Montreal, Canada)',
  venueShort: 'ACM FSE 2026',
  date: 'July 2026',
  href: '/research/agentbound',
  oneLiner: 'Least-privilege access control for MCP servers, enforced before an action runs.',
  thesis:
    'Android-style permission manifests and a container sandbox for MCP servers. Servers declare what they need, users consent to concrete resources, and the sandbox blocks everything else, without changing the servers.',
  links: [
    { label: 'DOI 10.1145/3808103', href: 'https://doi.org/10.1145/3808103' },
    { label: 'arXiv 2510.21236', href: 'https://arxiv.org/abs/2510.21236' },
    { label: 'PDF', href: 'https://arxiv.org/pdf/2510.21236' },
    { label: 'Replication package (Zenodo)', href: 'https://doi.org/10.5281/zenodo.19571298' },
    { label: 'Code (GitHub)', href: 'https://github.com/GuardiAgent' },
  ],
  codeStatus: 'Code available',
  bibtex: `@inproceedings{buehler2026AgentBound,
  title = {{{AgentBound}}: {{Securing}} Execution Boundaries of {{AI}} Agents},
  booktitle = {Proceedings of the 34th {{ACM}} Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering ({{FSE}})},
  author = {Bühler, Christoph and Biagiola, Matteo and Di Grazia, Luca and Salvaneschi, Guido},
  date = {2026-07},
  series = {2026},
  volume = {3},
  pages = {24},
  publisher = {ACM},
  address = {New York, NY, USA},
  location = {Montreal, Canada},
  doi = {10.1145/3808103},
  acronym = {FSE},
  articleno = {FSE096},
  issue = {FSE},
  supp = {https://doi.org/10.5281/zenodo.19571298}
}`,
  stats: [
    { value: '296', label: 'most popular MCP servers analyzed for the permissions they need', source: '§4.1.1', highlight: true },
    { value: '80.9%', label: 'of generated manifests judged correct by responding maintainers', source: '§4.1.3', highlight: true },
    { value: '100%', label: 'recall: maintainers reported no missing capability', source: '§4.1.3' },
    { value: '28 / 48', label: 'generated manifests identical to expert-written ones', source: '§4.1.4' },
    { value: '9', label: 'attacks blocked: every evaluated attack that crossed its declared boundary', source: '§4.2, Fig. 5' },
    { value: '0.6 ms', label: 'average per-operation overhead on macOS (0.29 ms on Debian)', source: '§4.3', highlight: true },
    { value: '83.1%', label: 'of popular MCP servers need outbound network access', source: '§4.1.2, Fig. 3' },
    { value: '0', label: 'changes needed to existing MCP servers to run them sandboxed', source: '§1, §3' },
  ],
};

export const agentSpy: Paper = {
  id: 'agentspy',
  name: 'AgentSpy',
  title: 'AgentSpy: Making AI Agent Behavior Observable',
  mode: 'Observe',
  boundary: 'OS boundary',
  status: 'Preprint',
  venue: 'arXiv:2610.06001 [cs.SE]',
  venueShort: 'arXiv, Oct 2026',
  date: '5 October 2026',
  href: '/research/agentspy',
  oneLiner: 'Record what an agent and every process it starts actually did, from outside the agent.',
  thesis:
    'Run the agent in a disposable Firecracker microVM and record the system calls and network traffic of the agent and every process it spawns. Deterministic analyses then check what a run should do and what it must never do.',
  links: [
    { label: 'arXiv 2610.06001', href: 'https://arxiv.org/abs/2610.06001' },
    { label: 'PDF', href: 'https://arxiv.org/pdf/2610.06001' },
  ],
  bibtex: `@misc{buehler2026AgentSpy,
  title = {{AgentSpy}: Making {AI} Agent Behavior Observable},
  author = {Bühler, Christoph and Biagiola, Matteo and Di Grazia, Luca and Salvaneschi, Guido},
  year = {2026},
  eprint = {2610.06001},
  archivePrefix = {arXiv},
  primaryClass = {cs.SE},
  url = {https://arxiv.org/abs/2610.06001}
}`,
  stats: [
    { value: '18%', label: 'of task-model pairs that passed every test still showed activity unrelated to the task', source: '§4.2 (16 of 88)', highlight: true },
    { value: '17%', label: 'of task-model pairs that passed every test reached the result without the developers\' skill guidance', source: '§4.2 (15 of 88)' },
    { value: '7%', label: 'of task-model pairs that passed every test read the benchmark\'s grading files', source: '§4.2 (6 of 88)' },
    { value: '14 / 18', label: 'executed skill-injection attacks flagged by deterministic system-call rules', source: '§4.3', highlight: true },
    { value: '0', label: 'false alarms in the 32 runs without executed injected behavior (precision 1.00)', source: '§4.3, Fig. 5' },
    { value: '92.2%', label: 'of comparisons: repeated runs of a task look more alike than runs mixed with another task', source: '§4.1' },
    { value: '35', label: 'Crossref connections hidden inside a single trajectory step', source: '§3.4.1' },
    { value: 'p ≥ 0.16', label: 'no statistically significant runtime overhead from monitoring', source: '§4.4', highlight: true },
  ],
};

export const papers = [agentBound, agentSpy];

export const githubRepos: PaperLink[] = [
  { label: 'GuardiAgent/docker-mcp-sandbox', href: 'https://github.com/GuardiAgent/docker-mcp-sandbox' },
  {
    label: 'GuardiAgent/python-mcp-sandbox-openai-sdk',
    href: 'https://github.com/GuardiAgent/python-mcp-sandbox-openai-sdk',
  },
];

// Highwire Press tags read by Google Scholar and reference managers.
export function citationMeta(paper: Paper): Record<string, string | string[]> {
  const base = {
    citation_title: paper.title,
    citation_author: authors.map((a) => a.name),
  };
  if (paper.id === 'agentbound') {
    return {
      ...base,
      citation_publication_date: '2026/07',
      citation_journal_title: 'Proceedings of the ACM on Software Engineering',
      citation_volume: '3',
      citation_issue: 'FSE',
      citation_firstpage: '2141',
      citation_lastpage: '2164',
      citation_doi: '10.1145/3808103',
      citation_pdf_url: 'https://arxiv.org/pdf/2510.21236',
    };
  }
  return {
    ...base,
    citation_publication_date: '2026/10/05',
    citation_arxiv_id: '2610.06001',
    citation_pdf_url: 'https://arxiv.org/pdf/2610.06001',
  };
}
