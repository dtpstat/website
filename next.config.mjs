// @ts-check

/**
 * @type import("next").NextConfig
 */
const nextConfig = {
  experimental: {
    styledComponents: true,
  },

  productionBrowserSourceMaps: true,
  reactStrictMode: true,

  // We call linters in GitHub Actions for all pull requests. By not linting
  // again during `next build`, we save CI minutes and unlock more feedback.
  // For local checks, run `yarn lint`.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  redirects: async () => [
    {
      source: "/dtp/:slug",
      destination: "https://dtp-stat.ru/dtp/:slug",
      permanent: false,
    },
  ],
};

export default nextConfig;
