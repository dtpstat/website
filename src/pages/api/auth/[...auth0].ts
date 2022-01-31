import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

import { handleProfile } from "../profile";

const handler: NextApiHandler = handleAuth({
  login: (req, res, { returnTo, ...rest } = {}) => {
    // Enable navigation back to a page where ‘login’ was pressed
    const customReturnTo =
      typeof req.query["returnTo"] === "string"
        ? req.query["returnTo"]
        : undefined;

    const customReturnToIsValid =
      customReturnTo &&
      customReturnTo.startsWith("/") && // e.g. /42
      !customReturnTo.startsWith("//"); // e.g. //evil.example.com/42

    return handleLogin(req, res, {
      returnTo: customReturnToIsValid ? customReturnTo : returnTo,
      ...rest,
    });
  },
  profile: (req, res) => {
    return handleProfile(req, res);
  },
});

export default withSentry(handler);
