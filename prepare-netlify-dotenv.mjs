// @ts-check

/*
 * This script contains workarounds for Netlify environment variables. It transforms
 * variables available at build time and writes them into a dotenv file.
 * This file is then read by Next.js both at build time and run time.
 *
 * The script is launched via netlify.toml.
 */

import fs from "node:fs";

/** @type {Record<string, string>} */
const envToWrite = {};

/*
 * Netlify UI does not support context-based environment variables.
 * For example, we cannot configure XYZ=42 for deploy previews (pull requests)
 * and XYZ=4242 for production (main branch).
 *
 * As a workaround, we read Netlify’s CONTEXT env variable and then
 * map XYZ_PROD or XYZ_PR into XYZ.
 */

const suffixByContext = {
  production: "PROD",
  "deploy-preview": "PR",
};

const suffix = suffixByContext[process.env.CONTEXT];

if (suffix) {
  for (const key in process.env) {
    if (key.endsWith(`_${suffix}`)) {
      envToWrite[key.slice(undefined, suffix.length - 1)] = process.env[key];
    }
  }
}

/*
 * Deploy previews and production release require different AUTH0_BASE_URL.
 * We cannot set this variable dynamically in the Netlify UI, So we define
 * it based on system variables available at build time:
 * https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
 */

if (process.env.AUTH0_BASE_URL) {
  throw new Error(
    `Did not expect AUTH0_BASE_URL to be defined (=${process.env.AUTH0_BASE_URL}). Please remove it from Netlify UI or delete this code.`,
  );
}

envToWrite["AUTH0_BASE_URL"] =
  process.env.CONTEXT === "deploy-preview"
    ? process.env.DEPLOY_PRIME_URL
    : process.env.URL;

if (!envToWrite["AUTH0_BASE_URL"]) {
  throw new Error(
    "Did not expect generated AUTH0_BASE_URL to be empty. Please check the values of CONTEXT / DEPLOY_PRIME_URL / URL.",
  );
}

/*
 * Write all defined variables into a dotenv file
 */

const dotenvFilePath = ".env.production.local";

if (fs.existsSync(dotenvFilePath)) {
  throw new Error(
    `Did not expect ${dotenvFilePath} to exist. Please delete it and make sure it is ignored by git.`,
  );
}

const serializedEnvToWrite = Object.entries(envToWrite)
  .map(([key, value]) => `${key}=${value}\n`)
  .join("");

fs.writeFileSync(
  dotenvFilePath,
  `## Generated by ./prepare-netlify-dotenv.mjs\n\n${serializedEnvToWrite}`,
);