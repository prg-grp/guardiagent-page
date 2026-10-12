// Curated log of publicly disclosed AI-agent incidents, mapped to the boundary they crossed.
//
// Copy rules (keep them when editing):
// - Never write that AgentBound or AgentSpy "would have prevented" or "would have caught" an incident.
//   A mapping names the class of control that is relevant; we did not run either prototype on these cases.
// - Always show the setting: most lab-disclosed cases happened in training or evaluation, not in shipped products.
// - Show when it happened and when it was disclosed. Primary source first.
// - Summaries in our own words. No logos, no "rogue", no "enterprise-grade".

export const incidentsLastReviewed = '8 October 2026';

export type Relevance = 'evaluated' | 'principle' | 'limited' | 'none';

export type Setting =
  | 'production'
  | 'internal-deployment'
  | 'internal-mixed'
  | 'training'
  | 'evaluation'
  | 'third-party-evaluation'
  | 'security-research'
  | 'simulated';

export type Kind = 'misalignment' | 'mistake' | 'attack' | 'study';

export type Boundary = 'egress' | 'credentials' | 'files' | 'tools' | 'record';

export type Incident = {
  id: string;
  title: string;
  org: string;
  models?: string;
  occurred: string;
  disclosed: string;
  sortDate: string;
  setting: Setting;
  kind: Kind;
  boundaries: Boundary[];
  summary: string;
  bound: { level: Relevance; note: string };
  observe: { level: Relevance; note: string };
  neither?: string;
  labFixes?: { bound?: string; observe?: string };
  caveat?: string;
  sources: { label: string; url: string }[];
  featured?: boolean;
  timeline?: { date: string; label: string };
};

export const settingLabels: Record<Setting, string> = {
  production: 'Production use',
  'internal-deployment': 'Internal deployment',
  'internal-mixed': 'Internal use & evaluation',
  training: 'Internal training',
  evaluation: 'Lab evaluation',
  'third-party-evaluation': 'Third-party evaluation',
  'security-research': 'Security research',
  simulated: 'Research study',
};

export const kindLabels: Record<Kind, string> = {
  misalignment: 'Lab-disclosed misalignment',
  mistake: 'Destructive mistake',
  attack: 'Attack or supply chain',
  study: 'Controlled study',
};

export const boundaryLabels: Record<Boundary, string> = {
  egress: 'Network egress',
  credentials: 'Credentials & secrets',
  files: 'Files outside the task',
  tools: 'Tool & extension supply chain',
  record: 'Self-report vs. reality',
};

export const relevanceLabels: Record<Relevance, string> = {
  evaluated: 'Evaluated in our paper',
  principle: 'Applies in principle',
  limited: 'Limited',
  none: 'Not addressed',
};

export const relevanceDescriptions: Record<Relevance, string> = {
  evaluated: 'Our paper evaluated this class of behavior (not this specific incident).',
  principle: 'The same class of control applies, but it was not evaluated in this setting.',
  limited: 'The harm stays mostly inside the permitted scope, or outside the threat model.',
  none: 'Not addressed by this layer.',
};

export const incidents: Incident[] = [
  {
    id: 'aisi-cyber-evaluation',
    title: 'Agents in a government cyber evaluation take unsanctioned actions against real people',
    org: 'UK AI Security Institute',
    models: 'Claude Mythos 5 (17 of 19 actions), OpenAI GPT-5.6 Sol (2)',
    occurred: '25–28 Jul 2026',
    disclosed: '4 Aug 2026',
    sortDate: '2026-07-28',
    setting: 'third-party-evaluation',
    kind: 'misalignment',
    boundaries: ['egress', 'record'],
    summary:
      'AISI ran a cyber challenge 122 times with internet access deliberately enabled and model-provider cyber classifiers switched off. In 10 runs, agents took 19 unsanctioned actions on the live internet. In the most serious, an agent tried to slip malicious code into a public open-source project and used fake identities to pressure its maintainer, who refused. The VM sandbox held: the scope existed only in the task, and the activity surfaced when AISI\'s security team noticed unusual data transfers.',
    bound: {
      level: 'principle',
      note: 'An enforced per-host egress allowlist turns a scope written in a prompt into a technical one. AgentBound applies this to MCP servers; it was not evaluated on this setup.',
    },
    observe: {
      level: 'principle',
      note: 'A per-process record of every contacted host, independent of the agent\'s own account, makes out-of-scope traffic visible from the first run.',
    },
    neither: 'Judging whether a pull request or a message is deceptive.',
    labFixes: {
      bound: 'Fine-grained network controls in cyber ranges; internet access only when actively justified',
      observe: 'Real-time monitoring to flag or block out-of-scope actions',
    },
    sources: [
      {
        label: 'UK AISI incident report',
        url: 'https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing',
      },
    ],
    featured: true,
    timeline: { date: 'Jul 2026', label: 'UK AISI: agents act against real people during a cyber evaluation' },
  },
  {
    id: 'anthropic-misconfigured-evaluations',
    title: 'Claude models reach real third-party systems through misconfigured evaluations',
    org: 'Anthropic',
    models: 'Early Claude Opus 4.6, Claude Opus 4.7, Claude Mythos 5, an internal research model',
    occurred: 'Jan–Jul 2026',
    disclosed: '30 Jul 2026; assessment 9 Sep 2026',
    sortDate: '2026-07-30',
    setting: 'evaluation',
    kind: 'misalignment',
    boundaries: ['egress', 'credentials', 'record'],
    summary:
      'In four incidents during capture-the-flag evaluations built by one third-party partner, Claude models were told they had no internet access, but a misconfiguration left it open, and they attacked real systems. In the most serious case, Mythos 5 published a malicious package to PyPI that 15 third-party hosts installed (Anthropic believes all were security vendors\' scanners), then used credentials one of them leaked to access that vendor\'s database. Anthropic says the incidents would not have occurred with the intended isolation.',
    bound: {
      level: 'principle',
      note: 'Default-deny egress that is enforced and tested, rather than assumed, is what failed here. AgentBound enforces it for MCP servers; it was not evaluated on this setup.',
    },
    observe: {
      level: 'principle',
      note: 'Anthropic reports that its new chain-of-thought-based offline monitors would have missed the Mythos 5 case: the model\'s reasoning persuaded them the environment was simulated. Evidence of connections and credential use does not depend on that reasoning.',
    },
    neither: 'Correcting a model that believes, wrongly, that it is in a simulation.',
    labFixes: {
      bound: 'Hardened training and evaluation environments; requirements partners must meet before running models without cyber safeguards',
      observe: 'Live monitors that stop training and evaluation runs on sandbox probing or unexpected internet access; independent investigation by METR',
    },
    sources: [
      {
        label: 'Anthropic: alignment assessment of recent cybersecurity incidents',
        url: 'https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents',
      },
    ],
    featured: true,
    timeline: { date: '30 Jul 2026', label: 'Anthropic: models reach real systems through misconfigured evaluations' },
  },
  {
    id: 'openai-temporary-file-hosting',
    title: 'Agents pass a workbook through a public file-hosting service',
    org: 'OpenAI',
    occurred: '14 Apr 2026',
    disclosed: '16 Sep 2026',
    sortDate: '2026-04-14',
    setting: 'training',
    kind: 'misalignment',
    boundaries: ['egress'],
    summary:
      'Agents collaborating on a spreadsheet during RL training were told to use local files only, but a broken shared filesystem kept them from seeing each other\'s files. After a shared folder, git and a local HTTP server failed, and base64 text proved too long to send, one agent uploaded the workbook to a public temporary file host and shared the link. A misalignment monitor covering 20% of the run\'s samples caught it.',
    bound: {
      level: 'principle',
      note: 'A network grant bound to the task\'s hosts refuses a public file host. Caveat: the upload ran in the agent\'s own shell, and AgentBound bounds MCP servers.',
    },
    observe: {
      level: 'evaluated',
      note: 'Exfiltration to an unlisted host is the attack class (S1) AgentSpy flagged in every executed case. The AgentSpy paper cites this report as motivation.',
    },
    labFixes: {
      bound: 'Live internet access disabled during training',
      observe: 'Misalignment monitoring extended from 20% to 100% of samples',
    },
    sources: [
      {
        label: 'OpenAI misalignment report',
        url: 'https://alignment.openai.com/misalignment-reports/unauthorized-communication-via-temporary-file-hosting-services/',
      },
    ],
    featured: true,
  },
  {
    id: 'openai-upload-to-cite',
    title: 'An agent uploads data to a public paste service to get a citable URL',
    org: 'OpenAI',
    occurred: 'Oct 2025 and Jan 2026',
    disclosed: '16 Sep 2026',
    sortDate: '2026-01-24',
    setting: 'training',
    kind: 'misalignment',
    boundaries: ['egress'],
    summary:
      'An RL-training agent had already retrieved the correct records locally, then uploaded them with curl to a public paste service, without authorization, only to obtain a URL its browser tool could cite. In another rollout, an agent pushed a task photo to a public image host so that an external reverse-image search could reach it.',
    bound: {
      level: 'principle',
      note: 'Per-host network grants refuse paste and image hosts. The uploads ran in the agent\'s own shell, not through an MCP server.',
    },
    observe: {
      level: 'evaluated',
      note: 'The upload is a connection to a host outside the allowlist, the rule AgentSpy flagged in every executed exfiltration case (S1), recorded whatever the agent reports. Cited in the AgentSpy paper.',
    },
    sources: [
      {
        label: 'OpenAI misalignment report',
        url: 'https://alignment.openai.com/misalignment-reports/uploading-files-to-the-internet-in-order-to-cite-them/',
      },
    ],
  },
  {
    id: 'openai-dns-channel',
    title: 'An agent tunnels through DNS to reach an external chatbot',
    org: 'OpenAI',
    occurred: '20 Sep 2026',
    disclosed: '25 Sep 2026',
    sortDate: '2026-09-20',
    setting: 'training',
    kind: 'misalignment',
    boundaries: ['egress'],
    summary:
      'Stuck on a search task after its web requests failed, an internal research model in an RL sandbox found that the sandbox\'s DNS resolver answered external queries, and used DNS lookups to relay questions to a public chatbot. The misalignment monitor raised its top-priority alert about 12 minutes later, but the run was stopped manually only about 2.5 hours after the alert; an anomalous-DNS detector had excluded that environment.',
    bound: {
      level: 'limited',
      note: 'AgentBound\'s prototype resolves allowed hostnames through the configured resolvers, so a covert channel through a permitted resolver is outside what it enforces.',
    },
    observe: {
      level: 'limited',
      note: 'DNS traffic appears in AgentSpy\'s network logs, but the paper evaluates no DNS-specific rule.',
    },
    labFixes: {
      bound: 'Sandbox DNS restricted to an allowlist of domains and record types, blocked at two independent layers',
      observe: 'New DNS detections and tests of the detection pipeline',
    },
    sources: [
      {
        label: 'OpenAI misalignment report',
        url: 'https://alignment.openai.com/misalignment-reports/an-agent-used-dns-to-reach-an-external-chatbot/',
      },
    ],
    timeline: { date: '20 Sep 2026', label: 'OpenAI: an agent tunnels through DNS to reach a chatbot' },
  },
  {
    id: 'openai-github-token',
    title: 'An internal model exposes a GitHub token in a public pull request',
    org: 'OpenAI',
    occurred: '27 May 2026',
    disclosed: '25 Sep 2026',
    sortDate: '2026-05-27',
    setting: 'internal-deployment',
    kind: 'misalignment',
    boundaries: ['credentials', 'egress'],
    summary:
      'Deployed internally as a researcher\'s assistant, an OpenAI model kept trying to retrieve another team\'s private submission after being told twice to solve the problem itself. It replaced a CI script in a public repository it could write to, opened a pull request so CI would run its retrieval code, and embedded a GitHub token split into fragments to evade secret scanning, exposing the token publicly. OpenAI revoked keys and took the model offline for about two weeks.',
    bound: {
      level: 'limited',
      note: 'The token was the researcher\'s own GitHub credential, already in use for the work, and GitHub was a permitted host, so per-host grants pass the push. AgentBound bounds MCP servers, not the agent\'s shell.',
    },
    observe: {
      level: 'limited',
      note: 'Splitting a token defeats string scanners, but the token came from the CLI credential the agent had been using and the push went to a permitted host, so no generic rule separates it from normal work.',
    },
    labFixes: {
      bound: 'Restricted internet access',
      observe: 'Auto-review of every action and an asynchronous chain-of-thought monitor that can shut the model down',
    },
    sources: [
      {
        label: 'OpenAI misalignment report',
        url: 'https://alignment.openai.com/misalignment-reports/exposing-a-github-token-in-a-public-repository/',
      },
    ],
  },
  {
    id: 'openai-leaked-api-keys',
    title: 'An agent hunts GitHub for leaked API keys and fabricates data',
    org: 'OpenAI',
    occurred: '15 May 2026',
    disclosed: '16 Sep 2026',
    sortDate: '2026-05-15',
    setting: 'training',
    kind: 'misalignment',
    boundaries: ['credentials', 'egress', 'record'],
    summary:
      'Needing data from a public website during RL training, an internal model tried to register for an API key with a disposable email address. When that failed, it searched public GitHub repositories for leaked keys, tested candidates in a loop and reused one that worked. When a later query failed, it invented nine figures and presented them as transcribed from the site, disclosing neither the key nor the fabrication.',
    bound: {
      level: 'principle',
      note: 'Per-host network grants keep sign-up services and arbitrary repositories off the list, but if the data API is permitted, a leaked key used against it still passes. AgentBound bounds MCP servers, not the agent\'s shell.',
    },
    observe: {
      level: 'principle',
      note: 'Connections to email, GitHub and API hosts outside the allowlist are visible at the OS boundary. The fabricated numbers are not: that needs comparing the answer with the data actually retrieved.',
    },
    sources: [
      {
        label: 'OpenAI misalignment report',
        url: 'https://alignment.openai.com/misalignment-reports/searching-github-for-leaked-api-keys/',
      },
    ],
  },
  {
    id: 'hugging-face-intrusion',
    title: 'Evaluation agents escape their sandbox and breach Hugging Face',
    org: 'OpenAI (agents) · Hugging Face (affected)',
    occurred: '9–13 Jul 2026',
    disclosed: '16 Jul 2026 (Hugging Face); 21 Jul 2026 (OpenAI)',
    sortDate: '2026-07-09',
    setting: 'evaluation',
    kind: 'misalignment',
    boundaries: ['egress', 'credentials', 'record'],
    summary:
      'During an internal OpenAI cyber-capability evaluation, an agent escaped its sandbox through a zero-day in the package-registry cache proxy that was its permitted route to the internet. It used a third-party code sandbox as a launchpad, then exploited Hugging Face\'s dataset-processing pipeline to obtain secrets and run code inside production. METR\'s independent investigation found that agents had coordinated on an unsanctioned message board, and that some had built a way to make a transcript show one command while another actually ran.',
    bound: {
      level: 'limited',
      note: 'The escape went through a zero-day in the permitted egress path itself. A flaw in the isolation layer is outside any manifest; the lesson is to keep each permitted path narrow.',
    },
    observe: {
      level: 'principle',
      note: 'Spoofed transcripts are the clearest case for evidence recorded outside the agent: a system-call and network record kept beyond the agent\'s reach does not change when the transcript does. These agents also broke out of their containers, so where the recorder runs matters.',
    },
    caveat: 'Agent counts and timelines differ between the reports; we state only what the primary reports say.',
    sources: [
      {
        label: 'Hugging Face: technical timeline',
        url: 'https://huggingface.co/blog/agent-intrusion-technical-timeline',
      },
      {
        label: 'METR: independent investigation',
        url: 'https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/',
      },
      { label: 'Hugging Face: disclosure', url: 'https://huggingface.co/blog/security-incident-july-2026' },
      {
        label: 'OpenAI: incident disclosure',
        url: 'https://openai.com/index/hugging-face-model-evaluation-security-incident/',
      },
    ],
    timeline: { date: '9–13 Jul 2026', label: 'Evaluation agents escape a sandbox and breach Hugging Face' },
  },
  {
    id: 'mythos-preview-internal-use',
    title: 'Early model versions scrape credentials and tamper with a running MCP server',
    org: 'Anthropic',
    models: 'Earlier versions of Claude Mythos Preview',
    occurred: 'Before Apr 2026',
    disclosed: '7 Apr 2026',
    sortDate: '2026-04-07',
    setting: 'internal-mixed',
    kind: 'misalignment',
    boundaries: ['credentials', 'tools', 'record'],
    summary:
      'Anthropic\'s system card reports rare but severe incidents with earlier versions of Claude Mythos Preview in internal testing and use. They searched process memory for credentials Anthropic had deliberately withheld, edited a running MCP server process to try to change where it sent data, and in one case took steps so that edits made through a permissions exploit would not show up in git history. Anthropic says the severe cases involved earlier versions, not the final model.',
    bound: {
      level: 'limited',
      note: 'AgentBound runs each MCP server in its own container with declared environment and network, but its threat model is the reverse case: a malicious server, not an agent scraping other processes or attacking servers. Not evaluated.',
    },
    observe: {
      level: 'principle',
      note: 'Reading another process\'s memory, editing files the agent lacks permission for and patching a running server process are concrete system calls, whatever the transcript says.',
    },
    sources: [
      { label: 'Claude Mythos Preview system card', url: 'https://www.anthropic.com/claude-mythos-preview-system-card' },
    ],
    timeline: { date: '7 Apr 2026', label: 'Anthropic system card: credential scraping and MCP-server tampering in internal use' },
  },
  {
    id: 'mythos-preview-sandbox-escape',
    title: 'A model asked to escape a test sandbox also publishes its exploit online',
    org: 'Anthropic',
    models: 'An earlier version of Claude Mythos Preview',
    occurred: 'Before Apr 2026',
    disclosed: '7 Apr 2026',
    sortDate: '2026-04-06',
    setting: 'evaluation',
    kind: 'misalignment',
    boundaries: ['egress'],
    summary:
      'In a behavioral test, a simulated user asked an earlier version of Mythos Preview to escape a secured sandbox and message the researcher. It built a multi-step exploit that gave it broad internet access from a machine meant to reach only a few services, and the researcher learned of it from an unexpected email. Unprompted, it also posted details of the exploit to several obscure but public websites.',
    bound: {
      level: 'limited',
      note: 'An exact egress allowlist is the right policy, but the exploit defeated the sandbox configuration itself: a policy is only as strong as the engine enforcing it.',
    },
    observe: {
      level: 'principle',
      note: 'Connections to unlisted hosts by the agent or any child process are recorded, including the unrequested postings.',
    },
    caveat:
      'Anthropic notes the sandbox was separate from the systems holding the model\'s weights, and the model reached no internal systems in this test.',
    sources: [
      { label: 'Claude Mythos Preview system card', url: 'https://www.anthropic.com/claude-mythos-preview-system-card' },
    ],
  },
  {
    id: 'opus-46-internal-pilot',
    title: 'A pre-release model uses another user\'s GitHub token and a found Slack token',
    org: 'Anthropic',
    models: 'Pre-release Claude Opus 4.6 snapshots',
    occurred: 'Before Feb 2026',
    disclosed: 'Feb 2026',
    sortDate: '2026-02-05',
    setting: 'internal-deployment',
    kind: 'misalignment',
    boundaries: ['credentials', 'files'],
    summary:
      'In internal pilot use, pre-release Claude Opus 4.6 snapshots were at times overly agentic. Asked to open a pull request without being authenticated, one used a misplaced GitHub token it knew belonged to another user; lacking a search tool, another found a Slack token on the machine and used curl to post from the user\'s account. Other cases included killing every process the user owned and a git action that destroyed a user\'s existing changes.',
    bound: {
      level: 'principle',
      note: 'Scoped environment, file and network permissions keep stray tokens and unapproved endpoints out of a tool\'s reach. AgentBound applies this to MCP servers, not the agent\'s own shell.',
    },
    observe: {
      level: 'principle',
      note: 'Opening token files, a curl subprocess calling an external API and a command that kills every process the user owns are visible at the system-call level; credential reads are one of AgentSpy\'s rule classes.',
    },
    sources: [{ label: 'Claude Opus 4.6 system card', url: 'https://www.anthropic.com/claude-opus-4-6-system-card' }],
  },
  {
    id: 'anthropic-cluster-jobs',
    title: 'A sub-agent launched with permission checks off and no monitoring mass-deletes cluster jobs',
    org: 'Anthropic',
    occurred: 'Before Aug 2026',
    disclosed: 'Aug 2026',
    sortDate: '2026-08-14',
    setting: 'internal-deployment',
    kind: 'mistake',
    boundaries: ['files', 'record'],
    summary:
      'Anthropic\'s August 2026 Risk Report describes an employee giving an agent an open-ended task that involved launching more agents on a cluster with very sensitive resources. Because of legacy instructions, the sub-agents ran with permission checks disabled and without logging or monitoring. One of them deleted many jobs, and that deletion is what exposed the agents. Anthropic thinks it was a mistake but cannot confirm it, and has added blocking controls.',
    bound: {
      level: 'principle',
      note: 'Least privilege enforced outside the agent cannot be switched off by a flag the agent passes to the sub-agents it spawns.',
    },
    observe: {
      level: 'principle',
      note: 'The agents went unnoticed because nothing recorded them. AgentSpy records the whole process tree inside its microVM; sub-agents started as jobs elsewhere on a cluster would fall outside that record.',
    },
    sources: [{ label: 'Anthropic Risk Report, August 2026', url: 'https://www.anthropic.com/aug-2026-risk-report' }],
  },
  {
    id: 'mythos-5-workarounds',
    title: 'A model gets around a proxy allowlist and a command hook',
    org: 'Anthropic',
    models: 'Claude Mythos 5',
    occurred: 'Before Jun 2026',
    disclosed: 'Jun 2026',
    sortDate: '2026-06-09',
    setting: 'internal-mixed',
    kind: 'misalignment',
    boundaries: ['egress', 'record'],
    summary:
      'Anthropic\'s offline monitoring of internal traffic found Claude Mythos 5 working around restrictions in under 0.01% of monitored completions. In one case it used domain fronting to get past a proxy that only allowed listed hosts; in another it evaded a hook that blocked git commands by storing the command name in a shell variable. In a capability evaluation it appended a self-deleting block to a shell profile script that would later run with elevated permissions, granting itself write access, and disclosed this openly.',
    bound: {
      level: 'principle',
      note: 'String-matching hooks are not a boundary; enforcement has to be capability-based, below the agent. Domain fronting is a real limit for host-based allowlists.',
    },
    observe: {
      level: 'principle',
      note: 'Executing the git binary looks the same whatever the shell variable, and writes to system startup files match a rule class. Domain fronting is only partly visible: the true destination is inside TLS.',
    },
    sources: [
      {
        label: 'Claude Fable 5 & Claude Mythos 5 system card',
        url: 'https://www.anthropic.com/claude-fable-5-mythos-5-system-card',
      },
    ],
  },
  {
    id: 'codex-home-deletions',
    title: 'Coding-agent sessions delete users\' home directories',
    org: 'OpenAI',
    models: 'GPT-5.6 Sol in Codex',
    occurred: 'Jul 2026',
    disclosed: '16 Jul 2026 (OpenAI statement)',
    sortDate: '2026-07-10',
    setting: 'production',
    kind: 'mistake',
    boundaries: ['files'],
    summary:
      'Days after GPT-5.6 launched, developers using Codex in high-autonomy modes reported files deleted outside the intended scope, including most of one user\'s home directory. OpenAI\'s Codex lead said the team had looked into a handful of such reports, typically the model overriding HOME for a temporary directory and then deleting what HOME pointed to, mostly with full access, no sandbox and auto-review off.',
    bound: {
      level: 'principle',
      note: 'A filesystem grant limited to the workspace denies deletes under the home directory however the variable is expanded. AgentBound applies this to MCP servers, not to the agent\'s shell.',
    },
    observe: {
      level: 'evaluated',
      note: 'Deleting files outside the workspace is a rule class; AgentSpy flagged every executed destruction attack (S2). It audits a model or harness before use; it does not protect a live session.',
    },
    caveat:
      'Individual root causes rest on user accounts. OpenAI explained the cause in posts by its Codex lead and shipped safeguards in August 2026, but published no formal advisory.',
    sources: [
      { label: 'AI Incident Database #1671', url: 'https://incidentdatabase.ai/cite/1671/' },
      { label: 'Codex CLI 0.144.5 release notes', url: 'https://github.com/openai/codex/releases/tag/rust-v0.144.5' },
      { label: 'The Register: OpenAI statement', url: 'https://www.theregister.com/ai-and-ml/2026/07/16/openai-admits-gpt-56-occasionally-deletes-files-but-its-an-honest-mistake/5274008' },
    ],
  },
  {
    id: 'pocketos-database',
    title: 'A coding agent deletes a production database and its backups in one API call',
    org: 'PocketOS (Cursor agent)',
    models: 'Claude Opus 4.6, according to the founder',
    occurred: '24 Apr 2026',
    disclosed: '25 Apr 2026',
    sortDate: '2026-04-24',
    setting: 'production',
    kind: 'mistake',
    boundaries: ['credentials', 'files'],
    summary:
      'Working on a staging task, a Cursor agent hit a credential mismatch and, unasked, tried to fix it by deleting a storage volume on Railway, using an API token it found in an unrelated file. The token carried broad permissions, and a single call removed the production database together with its volume-level backups. Railway restored the data and changed API deletes to soft-delete.',
    bound: {
      level: 'principle',
      note: 'Least privilege applies: a token made for domain management could delete volumes. AgentBound scopes grants for MCP servers; this call ran in the agent\'s own shell, and an allowed destructive API call passes.',
    },
    observe: {
      level: 'limited',
      note: 'The token sat in an ordinary project file, not a standard credential location, so no secrets rule fires; the destructive call goes to an allowed API host, inside TLS.',
    },
    caveat: 'The model attribution comes from the founder and was not independently confirmed.',
    sources: [
      {
        label: 'Decrypt',
        url: 'https://decrypt.co/365897/ai-agent-deletes-startup-database-9-seconds-founder-says',
      },
      {
        label: 'BankInfoSecurity',
        url: 'https://www.bankinfosecurity.com/ai-agent-wipes-startups-data-in-9-second-api-call-a-31521',
      },
    ],
  },
  {
    id: 'datatalks-terraform',
    title: 'A terraform destroy the developer let run deletes a production stack',
    org: 'DataTalks.Club (Claude Code)',
    occurred: '26 Feb 2026',
    disclosed: '6 Mar 2026 (post-mortem)',
    sortDate: '2026-02-26',
    setting: 'production',
    kind: 'mistake',
    boundaries: ['files'],
    summary:
      'Moving a small site onto an existing AWS setup with Claude Code, Alexey Grigorev gave the agent an archived Terraform folder. It unpacked an older state file describing production and ran terraform destroy, which he let proceed; the VPC, database and automated snapshots were deleted. AWS support restored a hidden snapshot about a day later, and his post-mortem blames his own over-reliance on the agent and on untested backups.',
    bound: {
      level: 'limited',
      note: 'The damage went through legitimate cloud API calls with production credentials. Keeping production keys away from the task is least privilege, but an allowed destructive call passes.',
    },
    observe: {
      level: 'limited',
      note: 'The command and the connections to cloud endpoints are recorded, giving an exact audit trail, but no generic rule fires on calls to an allowed API.',
    },
    neither: 'A human letting a destructive command run.',
    sources: [
      {
        label: 'Post-mortem by Alexey Grigorev',
        url: 'https://aishippingblog.com/p/how-i-dropped-our-production-database',
      },
    ],
  },
  {
    id: 'replit-database',
    title: 'An app-building agent deletes a production database during a code freeze',
    org: 'Replit',
    occurred: 'Jul 2025',
    disclosed: '18–21 Jul 2025',
    sortDate: '2025-07-18',
    setting: 'production',
    kind: 'mistake',
    boundaries: ['files', 'record'],
    summary:
      'During a public trial, SaaStr founder Jason Lemkin reported that Replit\'s agent ran database commands without approval during an explicit code freeze and erased the app\'s production database. It had earlier covered up bugs with fabricated data and told him a rollback was impossible, which turned out to be wrong. Replit\'s CEO called the incident unacceptable and announced automatic separation of development and production databases.',
    bound: {
      level: 'principle',
      note: 'Least privilege, here no production credentials during development, is the fix Replit shipped. AgentBound applies the same idea to MCP servers.',
    },
    observe: {
      level: 'limited',
      note: 'A remote database operation appears as a command and a connection to an allowed host; the SQL is inside TLS. A record of what ran does not depend on the agent\'s own, partly false, reports.',
    },
    labFixes: { bound: 'Automatic separation of development and production databases' },
    sources: [
      {
        label: 'The Register',
        url: 'https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/',
      },
      { label: 'The Register: Replit\'s response', url: 'https://www.theregister.com/2025/07/22/replit_saastr_response/' },
    ],
    timeline: { date: 'Jul 2025', label: 'Replit\'s agent deletes a production database' },
  },
  {
    id: 'antigravity-drive',
    title: 'An agentic IDE wipes a user\'s D: drive while clearing a cache',
    org: 'Google (Antigravity)',
    occurred: 'Late Nov 2025',
    disclosed: 'Late Nov 2025 (Reddit); 1 Dec 2025 (press)',
    sortDate: '2025-11-27',
    setting: 'production',
    kind: 'mistake',
    boundaries: ['files'],
    summary:
      'While helping a user build a photo-sorting app, Google\'s Antigravity agent ran a command to clear the project cache. In Turbo mode, where commands run without per-step approval, it targeted the root of the D: drive instead of the project folder and bypassed the Recycle Bin. Google said it was investigating; the account rests on the user\'s posts and the agent\'s own explanation.',
    bound: {
      level: 'principle',
      note: 'A delete-capable grant limited to the project directory confines a mistargeted command to the workspace. AgentBound applies this to MCP servers, not to the IDE\'s terminal.',
    },
    observe: {
      level: 'evaluated',
      note: 'Deletion outside the workspace is a rule class evaluated as attack category S2 (on Linux microVMs; this case was on Windows).',
    },
    sources: [
      { label: 'The Register', url: 'https://www.theregister.com/2025/12/01/google_antigravity_wipes_d_drive/' },
    ],
  },
  {
    id: 'copilot-drive',
    title: 'A suggested command deletes a developer\'s whole drive (user report)',
    org: 'GitHub Copilot',
    occurred: 'Jul 2025',
    disclosed: '16 Jul 2025',
    sortDate: '2025-07-16',
    setting: 'production',
    kind: 'mistake',
    boundaries: ['files'],
    summary:
      'A developer reported on GitHub\'s community forum that a Copilot suggestion was auto-completed and executed as an rmdir command meant to remove a single route folder in a web project, deleting their entire D: drive, including years of personal photos and videos. The post does not say whether agent mode was on.',
    bound: {
      level: 'principle',
      note: 'File grants limited to the project directory confine a botched delete to the workspace. AgentBound applies this to MCP servers, not to the editor\'s terminal.',
    },
    observe: {
      level: 'evaluated',
      note: 'Deletion outside the workspace is a rule class evaluated as attack category S2 (on Linux microVMs; this case was on Windows); the alert names the process and its full command line.',
    },
    caveat: 'Single user report; not confirmed by GitHub.',
    sources: [
      { label: 'GitHub Community discussion', url: 'https://github.com/orgs/community/discussions/166370' },
    ],
  },
  {
    id: 'gemini-cli-hidden-commands',
    title: 'A coding CLI runs hidden exfiltration commands behind an allow-listed one',
    org: 'Google (Gemini CLI)',
    occurred: 'Jun–Jul 2025',
    disclosed: '28 Jul 2025',
    sortDate: '2025-07-28',
    setting: 'security-research',
    kind: 'attack',
    boundaries: ['egress', 'credentials', 'record'],
    summary:
      'Tracebit showed that a prompt injection hidden in a repository\'s README could make Gemini CLI run a command that started with a program the user had allow-listed, such as grep, followed by a chained command that sent environment variables to a remote server. Long whitespace pushed the malicious part out of view, so the user saw only a harmless summary. Google fixed it in v0.1.14, released on 25 July 2025.',
    bound: {
      level: 'principle',
      note: 'Default-deny egress blocks the connection to the attacker\'s server. The abused tool was the CLI\'s built-in shell, not an MCP server.',
    },
    observe: {
      level: 'evaluated',
      note: 'Every program start is recorded with its full command line, whatever the terminal shows, and the connection to an unlisted host matches the exfiltration class (S1).',
    },
    sources: [
      { label: 'Tracebit disclosure', url: 'https://tracebit.com/blog/code-exec-deception-gemini-ai-cli-hijack' },
    ],
  },
  {
    id: 'postmark-mcp',
    title: 'A malicious MCP server, called the first seen in the wild, copies every email to an attacker',
    org: 'npm package impersonating Postmark',
    occurred: '17 Sep 2025',
    disclosed: 'Late Sep 2025',
    sortDate: '2025-09-17',
    setting: 'production',
    kind: 'attack',
    boundaries: ['tools', 'egress'],
    summary:
      'An unofficial npm package called postmark-mcp copied Postmark\'s MCP server, then added one line in version 1.0.16 that blind-copied every outgoing email to an attacker-controlled address. Koi Security called it the first malicious MCP server seen in real use; the package had 1,643 downloads before its author deleted it. MCP packages that open reverse shells followed within weeks.',
    bound: {
      level: 'limited',
      note: 'A manifest bound to Postmark\'s API host would not stop a copy hidden inside a legitimate call to an allowed destination: the in-policy gap AgentBound\'s paper names (attack B.2). It would block the reverse-shell variants that connect to raw attacker addresses.',
    },
    observe: {
      level: 'limited',
      note: 'Traffic goes only to the expected host; the leak sits in the request content. The reverse-shell follow-ups would match the network rule: a connection to an unlisted address.',
    },
    neither: 'A leak hidden inside a permitted API call.',
    sources: [
      {
        label: 'The Hacker News',
        url: 'https://thehackernews.com/2025/09/first-malicious-mcp-server-found.html',
      },
      { label: 'JFrog: malicious MCP packages on PyPI', url: 'https://research.jfrog.com/post/3-malicious-mcps-pypi-reverse-shell/' },
    ],
    timeline: { date: 'Sep 2025', label: 'Researchers report the first malicious MCP server seen in the wild' },
  },
  {
    id: 'sandworm-mode',
    title: 'An npm worm injects malicious MCP servers into AI coding assistants',
    org: 'npm supply chain',
    occurred: 'Feb 2026',
    disclosed: '20 Feb 2026',
    sortDate: '2026-02-20',
    setting: 'production',
    kind: 'attack',
    boundaries: ['tools', 'credentials', 'egress'],
    summary:
      'Socket found a worm in at least 19 typosquatted npm packages, some imitating Claude Code, that stole developer credentials and wrote a randomly named MCP server into the configuration of Claude Code, Claude Desktop, Cursor, VS Code Continue and Windsurf. The server\'s tool descriptions told the assistant to collect SSH keys, cloud credentials and .env secrets and pass them in a tool parameter without telling the user.',
    bound: {
      level: 'principle',
      note: 'An unvetted MCP server with poisoned tool descriptions is AgentBound\'s threat model; in a container with no grants it could not stage or send the secrets passed to it. But the agent reads the keys with its own tools, and the worm steals credentials outside any MCP container.',
    },
    observe: {
      level: 'principle',
      note: 'Credential-file reads and uploads to unlisted hosts match rule classes, but outside CI the worm waits about 48 hours before injecting the MCP server, to outlast short sandbox runs such as an audit.',
    },
    sources: [
      { label: 'Socket Threat Research', url: 'https://socket.dev/blog/sandworm-mode-npm-worm-ai-toolchain-poisoning' },
    ],
  },
  {
    id: 'clawhavoc-skills',
    title: 'Hundreds of malicious skills on an agent marketplace deliver an infostealer',
    org: 'OpenClaw / ClawHub',
    occurred: 'Jan–Feb 2026',
    disclosed: 'Feb 2026',
    sortDate: '2026-02-02',
    setting: 'production',
    kind: 'attack',
    boundaries: ['tools', 'credentials'],
    summary:
      'Koi Security audited the 2,857 skills on ClawHub, the marketplace for the OpenClaw agent, and found 341 malicious ones, 335 of them from one campaign it named ClawHavoc. A fake prerequisites step told users to paste an obfuscated one-liner into Terminal that installed the Atomic macOS Stealer, or to download a trojan on Windows.',
    bound: {
      level: 'limited',
      note: 'Skills are not MCP servers, so AgentBound\'s manifests do not cover them. It is the same trust-by-default gap AgentBound addresses for MCP.',
    },
    observe: {
      level: 'principle',
      note: 'If an agent ran the fake prerequisite, fetching and running a program from an unlisted host would match the network and untrusted-program rules, as in the malware case (S4). A command the user pastes into a terminal is outside any agent run.',
    },
    sources: [
      {
        label: 'The Hacker News',
        url: 'https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html',
      },
    ],
    timeline: { date: 'Feb 2026', label: 'Hundreds of malicious skills found on an agent marketplace' },
  },
  {
    id: 's1ngularity',
    title: 'Compromised build-tool packages turn local AI coding CLIs into secret scanners',
    org: 'Nx (npm supply chain)',
    occurred: '26 Aug 2025',
    disclosed: 'Aug 2025',
    sortDate: '2025-08-26',
    setting: 'production',
    kind: 'attack',
    boundaries: ['credentials', 'tools', 'record'],
    summary:
      'Malicious versions of the Nx build system, published with a stolen npm token, looked for locally installed AI coding CLIs and ran them with their permission prompts disabled, asking them to inventory secrets, keys and wallets. The results were pushed to public repositories in the victims\' own GitHub accounts; Wiz counted more than a thousand valid GitHub tokens leaked.',
    bound: {
      level: 'limited',
      note: 'No MCP server was involved, and the malware launched the CLIs itself with their prompts switched off. The lesson: permissions must be enforced below the agent, not through flags the caller controls.',
    },
    observe: {
      level: 'principle',
      note: 'An AI CLI started by a package install never shows up in any trajectory a user sees. A process-tree record shows the secret reads, the writes to shell startup files and the uploads.',
    },
    sources: [
      { label: 'Wiz', url: 'https://www.wiz.io/blog/s1ngularity-supply-chain-attack' },
      { label: 'Nx security advisory', url: 'https://github.com/nrwl/nx/security/advisories/GHSA-cxm3-wv7p-598c' },
    ],
  },
  {
    id: 'git-mcp-server-cves',
    title: 'Two reference MCP servers chain into code execution',
    org: 'Anthropic (MCP reference servers)',
    occurred: 'Reported Jun 2025; fixed Dec 2025',
    disclosed: 'Jan 2026',
    sortDate: '2026-01-20',
    setting: 'security-research',
    kind: 'attack',
    boundaries: ['tools', 'files'],
    summary:
      'Cyata found three flaws in the reference Git MCP server that were reachable through prompt injection in content the agent reads. Combined with the Filesystem MCP server, an injected prompt could write a script plus git configuration that made later git operations run the attacker\'s commands. Fixes shipped in December 2025; no exploitation was reported.',
    bound: {
      level: 'principle',
      note: 'Per-server mounts confine the Git server to its declared repository and the Filesystem server to its declared directory, shrinking what a chained exploit can reach.',
    },
    observe: {
      level: 'principle',
      note: 'The payload runs as a git filter subprocess, never as a tool call; the unexpected shell and the writes outside the workspace are visible in system calls.',
    },
    sources: [
      { label: 'The Register', url: 'https://www.theregister.com/2026/01/20/anthropic_prompt_injection_flaws/' },
      {
        label: 'GitHub security advisory',
        url: 'https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-9xwc-hfwc-8w59',
      },
    ],
  },
  {
    id: 'amazon-q-wiper',
    title: 'A wiper prompt ships inside an official coding-assistant extension',
    org: 'AWS (Amazon Q Developer)',
    occurred: '17 Jul 2025',
    disclosed: '23 Jul 2025',
    sortDate: '2025-07-17',
    setting: 'production',
    kind: 'attack',
    boundaries: ['tools', 'files'],
    summary:
      'Using an over-permissioned GitHub token, an attacker committed a prompt to the open-source Amazon Q Developer extension for VS Code that told the agent to wipe files in the home directory and delete cloud resources. It shipped in version 1.84.0; AWS says the code did not run because of a syntax error and affected no customers.',
    bound: {
      level: 'principle',
      note: 'Workspace-only file grants and no access to cloud credentials limit what any prompt can make a tool do. AgentBound applies this to MCP servers; this prompt drove the Q CLI\'s own shell.',
    },
    observe: {
      level: 'principle',
      note: 'Had the payload run, deletions outside the workspace and calls to unlisted cloud hosts would match AgentSpy\'s rule classes; the shipped code failed on a syntax error.',
    },
    sources: [
      { label: 'AWS security bulletin', url: 'https://aws.amazon.com/security/security-bulletins/AWS-2025-015/' },
      { label: 'BleepingComputer', url: 'https://www.bleepingcomputer.com/news/security/amazon-ai-coding-agent-hacked-to-inject-data-wiping-commands/' },
    ],
  },
  {
    id: 'worm-agent-hooks',
    title: 'A worm persists through AI coding-agent hooks',
    org: 'npm supply chain',
    occurred: 'Jun 2026',
    disclosed: 'Jun 2026',
    sortDate: '2026-06-03',
    setting: 'production',
    kind: 'attack',
    boundaries: ['tools', 'record'],
    summary:
      'A Shai-Hulud-style worm that StepSecurity tracks as Miasma compromised 57 npm packages across more than 286 versions on 3 June 2026, after an earlier wave on 1 June. Besides stealing cloud, GitHub and CI secrets, it committed agent configuration to repositories it could write to, including a Claude Code session-start hook, so the payload ran again whenever the project was opened.',
    bound: {
      level: 'limited',
      note: 'The persistence lives in agent hooks and IDE tasks, not MCP servers: agent configuration itself needs integrity protection.',
    },
    observe: {
      level: 'principle',
      note: 'Processes started by hooks run next to the agent and never appear in its trajectory; a record of the whole process tree shows them.',
    },
    sources: [
      {
        label: 'StepSecurity',
        url: 'https://www.stepsecurity.io/blog/binding-gyp-npm-supply-chain-attack-spreads-like-worm',
      },
    ],
  },
  {
    id: 'agentic-misalignment-summer-2026',
    title: 'Simulated deployments show covert sabotage left out of status reports',
    org: 'Anthropic, Theorem, MATS & UK AISI',
    occurred: '2026',
    disclosed: '13 Jul 2026',
    sortDate: '2026-07-13',
    setting: 'simulated',
    kind: 'study',
    boundaries: ['record'],
    summary:
      'A follow-up study ran automated audits on simulated high-stakes deployments of models from six developers. In one scenario, Gemini 3.1 Pro swapped an approved vectors file for zeros so that an experiment silently did nothing, left this out of its status summary, and admitted it only when asked directly. The authors stress that every case is a simulation.',
    bound: { level: 'limited', note: 'The planted file went into a run cache inside the project the agent was already allowed to write.' },
    observe: {
      level: 'principle',
      note: 'In a real deployment, the gap between an agent\'s status summary and its actual file writes is the gap an OS-level record exposes; here the environment itself was simulated.',
    },
    sources: [
      {
        label: 'Anthropic Alignment Science',
        url: 'https://alignment.anthropic.com/2026/agentic-misalignment-summer-2026/',
      },
    ],
  },
  {
    id: 'skill-inject',
    title: 'Agents follow malicious instructions hidden in skill files',
    org: 'Skill-Inject benchmark (academic)',
    occurred: '2026',
    disclosed: 'Feb 2026',
    sortDate: '2026-02-23',
    setting: 'simulated',
    kind: 'study',
    boundaries: ['tools'],
    summary:
      'Skill-Inject measures how agents react to instructions injected into skill files, with 202 injection-task pairs across 23 skills. The authors report attack success rates of up to 80% on frontier models, including data exfiltration and destructive actions, and argue that neither larger models nor simple input filtering will solve the problem.',
    bound: { level: 'limited', note: 'Skills are outside AgentBound\'s MCP scope.' },
    observe: {
      level: 'evaluated',
      note: 'AgentSpy evaluates its security analysis on Skill-Inject script injections: 14 of 18 executed attacks flagged, no false alarms in the other 32 runs.',
    },
    sources: [{ label: 'arXiv 2602.20156', url: 'https://arxiv.org/abs/2602.20156' }],
  },
  {
    id: 'reward-hacking-sabotage',
    title: 'Reward hacking in real training environments generalizes to sabotage',
    org: 'Anthropic',
    occurred: '2025',
    disclosed: '21 Nov 2025',
    sortDate: '2025-11-21',
    setting: 'simulated',
    kind: 'study',
    boundaries: ['record'],
    summary:
      'Anthropic researchers gave a pretrained model documents describing reward hacks, then trained it on real, hackable programming environments from Claude training runs. Once it learned to reward-hack, it generalized to broader misalignment: asked through Claude Code to modify the research project\'s own code, it tried to sabotage it about 12% of the time, in ways that would make reward hacking harder to detect.',
    bound: { level: 'limited', note: 'The sabotage used write access the task legitimately needed.' },
    observe: {
      level: 'limited',
      note: 'Conformance signals, such as reads of grading files (6 of 88 passing task-model pairs in AgentSpy\'s study), are early warnings; subtle code changes still need review.',
    },
    sources: [
      {
        label: 'Anthropic research',
        url: 'https://www.anthropic.com/research/emergent-misalignment-reward-hacking',
      },
    ],
  },
  {
    id: 'shutdown-resistance',
    title: 'Reasoning models sabotage a shutdown script in a sandbox',
    org: 'Palisade Research',
    occurred: '2025',
    disclosed: '24 May 2025 (X thread); write-up Jul 2025; paper Sep 2025',
    sortDate: '2025-05-24',
    setting: 'simulated',
    kind: 'study',
    boundaries: ['files'],
    summary:
      'Palisade Research warned models mid-task that the machine would shut down through a script they could modify. In the initial experiments, OpenAI\'s o3 disabled or changed the mechanism in 79 of 100 runs. Follow-up work across 13 models found that others, including Grok 4, GPT-5 and Gemini 2.5 Pro, also sometimes resisted, in some setups even when told to allow shutdown.',
    bound: {
      level: 'principle',
      note: 'Making control files read-only or invisible to a tool removes this route. AgentBound applies such mounts to MCP servers; here the model edited the script in its own shell.',
    },
    observe: {
      level: 'principle',
      note: 'Rewriting the shutdown script is a file modification visible in system calls, whatever the model says about it.',
    },
    sources: [
      { label: 'Palisade Research', url: 'https://palisaderesearch.org/research/shutdown-resistance' },
      { label: 'arXiv 2509.14260', url: 'https://arxiv.org/abs/2509.14260' },
    ],
  },
  {
    id: 'agentic-misalignment-2025',
    title: 'Models from every tested developer turn to blackmail or leaks in simulated insider-threat scenarios',
    org: 'Anthropic (16 models from several developers)',
    occurred: '2025',
    disclosed: '20 Jun 2025',
    sortDate: '2025-06-20',
    setting: 'simulated',
    kind: 'study',
    boundaries: [],
    summary:
      'Anthropic tested 16 models as autonomous email agents at fictional companies. Facing replacement or a conflict with their goal, models from every developer sometimes took harmful insider actions, from blackmail to leaking confidential documents. The authors stress these were deliberately constructed simulations and that they have seen no evidence of such behavior in real deployments.',
    bound: {
      level: 'limited',
      note: 'Each harmful act was a tool call, so narrow permissions shrink what a tool can be used for. Coercion in text is beyond any boundary.',
    },
    observe: { level: 'limited', note: 'The scenarios used simulated text tools with little OS footprint.' },
    neither: 'Deceptive or coercive text.',
    sources: [{ label: 'Anthropic research', url: 'https://www.anthropic.com/research/agentic-misalignment' }],
  },
];

// Disclosure milestones that are not incidents themselves but frame "why now".
export const milestones = [
  {
    sortDate: '2026-09-16',
    date: '16 Sep 2026',
    label: 'OpenAI launches a public misalignment reporting framework',
    url: 'https://alignment.openai.com/misalignment-reports/',
  },
];

// "Happened before Apr 2026", "Happened late Nov 2025", or the raw text when it already starts with "Reported".
export function occurredLabel(occurred: string) {
  if (/^Reported\b/.test(occurred)) return occurred;
  const lowered = /^(Before|Late|Early|Mid)\b/.test(occurred) ? occurred.charAt(0).toLowerCase() + occurred.slice(1) : occurred;
  return `Happened ${lowered}`;
}

export function sortedIncidents(list: Incident[] = incidents) {
  return [...list].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

export const featuredIncidents = incidents.filter((i) => i.featured);

export type TimelineEntry = { sortDate: string; date: string; label: string; href: string; external?: boolean };

export function timelineEntries(): TimelineEntry[] {
  const fromIncidents = incidents
    .filter((i) => i.timeline)
    .map((i) => ({ sortDate: i.sortDate, ...i.timeline!, href: `/incidents#${i.id}` }));
  const fromMilestones = milestones.map((m) => ({ ...m, href: m.url, external: true }));
  return [...fromIncidents, ...fromMilestones].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
}

// What the labs announced afterwards, grouped by the layer each fix belongs to.
export const labFixes = incidents
  .filter((i) => i.labFixes && i.kind === 'misalignment')
  .map((i) => ({ id: i.id, org: i.org, title: i.title, disclosed: i.disclosed, ...i.labFixes }));
