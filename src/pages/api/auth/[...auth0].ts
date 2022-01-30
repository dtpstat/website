import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

const handler: NextApiHandler = handleAuth({
  login: (req, res, { returnTo, ...rest } = {}) => {
    // Enables redirects to a page where login was pressed
    // Works together with
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
});

export default withSentry(handler);
