import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

const handleWithAuth0 = handleAuth({
  login: (req, res, { returnTo, ...rest } = {}) => {
    const customReturnTo =
      typeof req.query["returnTo"] === "string"
        ? req.query["returnTo"]
        : undefined;

    return handleLogin(req, res, {
      returnTo: customReturnTo ?? returnTo,
      ...rest,
    });
  },
});

const handler: NextApiHandler = async (req, res) => {
  return handleWithAuth0(req, res);
};

export default withSentry(handler);
