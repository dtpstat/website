const nextConfig = {
  experimental: {
    styledComponents: true,
  },

  productionBrowserSourceMaps: true,
  reactStrictMode: true,

  rewrites: () => ({
    fallback: [
      {
        // Add trailing slash to page urls (no .) to avoid infinite redirects
        source: "/:path([^\\.]+)*",
        destination: `${process.env.DJANGO_BASE_URL}/:path*/`,
      },
      {
        // Do not add trailing slash to files to avoid 404
        source: "/:path*",
        destination: `${process.env.DJANGO_BASE_URL}/:path*`,
      },
    ],
  }),

  // We call linters in GitHub Actions for all pull requests. By not linting
  // again during `next build`, we save CI minutes and unlock more feedback.
  // For local checks, run `yarn lint`.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
