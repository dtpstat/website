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

  rewrites: () => ({
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

  // We call linters in GitHub Actions for all pull requests. By not linting
  // again during `next build`, we save CI minutes and unlock more feedback.
  // For local checks, run `yarn lint`.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

/**
 * @type Partial<import("@sentry/nextjs/src/config/types").SentryWebpackPluginOptions>
 */
const sentryWebpackPluginOptions = {
  dryRun: !process.env.SENTRY_AUTH_TOKEN,
  silent: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
