export type NavItem = {
  label: string;
  href: string;
  description?: string;
  pillar?: 'bound' | 'spy';
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: 'Real Incidents', href: '/incidents' },
  { label: 'Our Approach', href: '/approach' },
  { label: 'AgentBound', href: '/research/agentbound', pillar: 'bound' },
  { label: 'AgentSpy', href: '/research/agentspy', pillar: 'spy' },
  { label: 'For developers', href: '/developers' },
];

export const footerNav = {
  research: [
    { label: 'AgentBound', href: '/research/agentbound' },
    { label: 'AgentSpy', href: '/research/agentspy' },
    { label: 'Publications', href: '/approach#publications' },
    { label: 'Team', href: '/#contact' },
  ],
  project: [
    { label: 'Real Incidents', href: '/incidents' },
    { label: 'Our Approach', href: '/approach' },
    { label: 'For developers', href: '/developers' },
    { label: 'Stay in touch', href: '/#contact' },
  ],
};
