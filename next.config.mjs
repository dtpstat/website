// @ts-check
import { withSentryConfig } from "@sentry/nextjs";

// Adding NEXT_PUBLIC_ makes environment variables available inside Next.js client.
// We don’t use the prefix outside Next.js code to make app setup less bulky and
// to avoid unnecessary breaking changes in it.
process.env.NEXT_PUBLIC_COMMENTS_ARE_PAUSED = process.env.COMMENTS_ARE_PAUSED;

process.env.NEXT_PUBLIC_DJANGO_BASE_URL = process.env.DJANGO_BASE_URL;
process.env.NEXT_PUBLIC_DJANGO_CONTENT_FALLBACK =
  process.env.DJANGO_CONTENT_FALLBACK;

process.env.NEXT_PUBLIC_SENTRY_DSN = process.env.SENTRY_DSN;
process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT;

/**
 * @type Omit<import("next").NextConfig, "webpack">
 * @todo Remove Omit<> when mismatch between Next Config and Sentry config is resolved
 */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },

  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,

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
    // Data dumps like /media/opendata/penzenskaia-oblast.geojson are too large to be
    // proxied by Netlify via fallback rewrites. Direct links are redirected to Django.
    ...(process.env.DJANGO_BASE_URL
      ? [
          {
            source: "/media/opendata/:slug*",
            destination: `${process.env.DJANGO_BASE_URL}/media/opendata/:slug*`,
            permanent: false,
          },
        ]
      : []),
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
            // Serve known pages with a local LRU cache and HTML modifications while proxying
            ...[
              "/",
              "/blog",
              "/blog/vision-zero",
              "/blog/proektirovanie-bezopasnykh-ulits",
              "/blog/zachem-nuzhny-dannye-dtp-i-chto-s",
              "/donate",
              "/opendata",
              "/pages/about",
              "/pages/dashboard",
            ].map((source) => ({
              source,
              destination: "/api/rewrites/proxy-django-html-page",
            })),
            {
              // Add trailing slash to page-like paths (/hello/world) to avoid infinite redirects
              source: "/:path([^\\.]+)*",
              destination: `${process.env.DJANGO_BASE_URL}/:path*/`,
            },
            {
              // Add trailing slash to root file-like paths (/hello.txt), also to avoid infinite
              // redirects (this is needed because of a special `old_redirect` rule in Django)
              source: "/:path",
              destination: `${process.env.DJANGO_BASE_URL}/:path/`,
            },
            {
              // Do not add trailing slash to all other file-like paths (/hello/world.txt)
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
