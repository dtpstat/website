import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

const handleWithAuth0 = handleAuth({
  login: (req, res, { returnTo, ...rest } = {}) => {
    return handleLogin(req, res, {
      getLoginState: () => {
        return {
          returnTo: req.query["return-url"] ?? returnTo,
        };
      },
      ...rest,
    });
  },
});

const handler: NextApiHandler = async (req, res) => {
  return handleWithAuth0(req, res);
};

export default withSentry(handler);
