/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // The old research page was the AgentBound paper page.
      { source: '/researchers', destination: '/research/agentbound', permanent: true },
      // The research overview now lives on the approach page.
      { source: '/research', destination: '/approach', permanent: true },
      // Short links for slides and talks.
      { source: '/agentbound', destination: '/research/agentbound', permanent: true },
      { source: '/agentspy', destination: '/research/agentspy', permanent: true },
    ];
  },
};

export default nextConfig;
