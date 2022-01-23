// @ts-check
import { withSentryConfig } from "@sentry/nextjs";

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
};

/**
 * @type Partial<import("@sentry/nextjs/src/config/types").SentryWebpackPluginOptions>
 */
const sentryWebpackPluginOptions = {
  dryRun: !process.env.SENTRY_AUTH_TOKEN,
  silent: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
