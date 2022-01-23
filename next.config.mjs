// @ts-check

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
};

export default nextConfig;
