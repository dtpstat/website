// @ts-check
import { withSentryConfig } from "@sentry/nextjs";

// Adding NEXT_PUBLIC_ makes environment variables available inside Next.js client.
// We don’t use the prefix outside Next.js code to make app setup less bulky and
// to avoid unnecessary breaking changes in it.
process.env.NEXT_PUBLIC_COMMENTS_ARE_PAUSED = process.env.COMMENTS_ARE_PAUSED;
process.env.NEXT_PUBLIC_DJANGO_BASE_URL = process.env.DJANGO_BASE_URL;
process.env.NEXT_PUBLIC_SENTRY_DSN = process.env.SENTRY_DSN;
process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT;

/**
 * @type Omit<import("next").NextConfig, "webpack">
 * @todo Remove Omit<> when mismatch between Next Config and Sentry config is resolved
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
    // This redirect was added before the public release to minimise SSR.
    // @todo Remove after 2022-03-01
    {
      source: "/iframes/comments/:slug",
      destination: "/iframes/comments?accident-id=:slug",
      permanent: true,
    },
  ],

  rewrites: () => ({
    beforeFiles: [
      {
        source: "/robots.txt",
        destination: "/api/rewrites/robots",
      },
    ],

    // Incremental adoption of Next.js (content form Django is served as fallback)
    // https://nextjs.org/docs/api-reference/next.config.js/rewrites#incremental-adoption-of-nextjs
    // @todo Remove once all web pages are migrated to React
    fallback:
      process.env.DJANGO_BASE_URL &&
      process.env.DJANGO_CONTENT_FALLBACK === "true"
        ? [
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
          ]
        : [],
  }),
};

/**
 * @type Partial<import("@sentry/nextjs/src/config/types").SentryWebpackPluginOptions>
 */
const sentryWebpackPluginOptions = {
  dryRun: !process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  deploy: {
    env: process.env.SENTRY_ENVIRONMENT,
  },
};

export default process.env.SENTRY_DSN
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;
