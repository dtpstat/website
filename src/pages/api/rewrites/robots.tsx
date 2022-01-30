import { withSentry } from "@sentry/nextjs";
import { NextApiHandler, NextApiRequest } from "next";

const robotsTxtInProduction = `
User-agent: *
Disallow: /admin
Disallow: /api
Disallow: /ckeditor
Disallow: /board
Disallow: /accounts
`.trim();

const robotsTxtElsewhere = `
User-agent: *
Disallow: /
`.trim();

const getRequestHost = (req: NextApiRequest): string | undefined =>
  typeof req.headers["x-forwarded-host"] === "string"
    ? req.headers["x-forwarded-host"]
    : req.headers["host"];

const hander: NextApiHandler = (req, res) => {
  res.setHeader("Cache-Control", "private");
  res.setHeader("Content-Type", "text/plain");
  res.send(
    getRequestHost(req) === process.env.PRODUCTION_HOST
      ? robotsTxtInProduction
      : robotsTxtElsewhere,
  );
};

export default withSentry(hander);
