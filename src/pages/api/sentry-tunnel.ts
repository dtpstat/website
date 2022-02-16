// Inspired by: https://docs.sentry.io/platforms/javascript/troubleshooting/#dealing-with-ad-blockers

import { captureException, withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const projectDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!projectDsn) {
    throw new Error("Sentry is currently disabled (DSN not set)");
  }

  try {
    const body = req.body as string;
    const pieces = body.split("\n");

    // @todo Implement runtime check instead of type casting
    const header = JSON.parse(pieces[0] ?? "") as Record<string, string>;
    const requestDsn = header["dsn"];

    if (projectDsn !== requestDsn) {
      throw new Error(`Invalid DSN: ${requestDsn!}`);
    }

    const { host, pathname: projectId } = new URL(requestDsn);
    const targetUrl = `https://${host}/api/${projectId}/envelope/`;
    const response = await fetch(targetUrl, { method: "POST", body });

    return response.json();
  } catch (error) {
    captureException(error);
    res.status(400).json({ status: "invalid request" });

    return;
  }
};

export default withSentry(handler);
