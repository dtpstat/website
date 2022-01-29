// @ts-check

import fs from "node:fs"; // If you see ESLint error in your editor, https://github.com/import-js/eslint-plugin-import/issues/2372

/** @type {Record<string, string>} */
const envToWrite = {};
const envFilePath = ".env.production.local";

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
      envToWrite[key.slice(suffixOrPrefix.length + 1)] = process.env[key];
    } else if (key.endsWith(`_${suffixOrPrefix}`)) {
      envToWrite[key.slice(undefined, suffixOrPrefix.length - 1)] =
        process.env[key];
    }
  }
}

if (process.env.AUTH0_BASE_URL) {
  throw new Error(
    `Did not expect process.env.AUTH0_BASE_URL to be defined (=${process.env.AUTH0_BASE_URL}). Remove it from Netlify UI or delete this code.`,
  );
}

envToWrite["AUTH0_BASE_URL"] = process.env.DEPLOY_PRIME_URL;

if (fs.existsSync(envFilePath)) {
  throw new Error(`Did not expect ${envFilePath} to exist`);
}
fs.writeFileSync(
  envFilePath,
  Object.entries(envToWrite)
    .map(([key, value]) => `${key}=${value}\n`)
    .join(""),
);
