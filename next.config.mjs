// @ts-check
import { withSentryConfig } from "@sentry/nextjs";

/*
 * Netlify UI does not support context-based environment variables.
 * For example, we cannot configure XYZ=42 for preview releases (pull requests)
 * and XYZ=4242 for production (main branch).
 *
 * As a workaround, we read Netlify’s CONTEXT env variable and then
 * map PROD_XYZ / XYZ_PROD or PR_XYZ / XYZ_PR into XYZ.
 */

const suffixOrPrefixByContext = {
  production: "PROD",
  "deploy-preview": "PR",
};

const suffixOrPrefix = suffixOrPrefixByContext[process.env.CONTEXT];

if (suffixOrPrefix) {
  for (const key in process.env) {
    if (key.startsWith(`${suffixOrPrefix}_`)) {
      process.env[key.slice(suffixOrPrefix.length + 1)] = process.env[key];
    } else if (key.endsWith(`_${suffixOrPrefix}`)) {
      process.env[key.slice(undefined, suffixOrPrefix.length - 1)] =
        process.env[key];
    }
  }
}

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
    // This redirect supports clicks on accident cards inside the map.
    // @todo Replace with navigation to Django while it’s used.
    {
      source: "/dtp/:slug",
      destination: "https://dtp-stat.ru/dtp/:slug",
      permanent: false,
    },

    // This redirect was added before the public release to minimise SSR.
    // @todo Remove after 2022-03-01.
    {
      source: "/iframes/comments/:slug",
      destination: "/iframes/comments?accident-id=:slug",
      permanent: true,
    },
  ],
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
