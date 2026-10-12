import type { MetadataRoute } from 'next';

const base = 'https://guardiagent.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/incidents', '/approach', '/research/agentbound', '/research/agentspy', '/developers'].map(
    (path) => ({ url: `${base}${path}`, changeFrequency: 'monthly', priority: path === '' ? 1 : 0.8 })
  );
}
