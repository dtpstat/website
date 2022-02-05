import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

import { prisma } from "../../../shared/prisma-helper";

const assertString: (value: any, name: string) => asserts value is string = (
  value,
  name,
) => {
  if (typeof value !== "string") {
    throw new TypeError(`Expected ${name} to be string, got ${typeof value}`);
  }
};

const assertOptionalString: (
  value: any,
  name: string,
) => asserts value is string | undefined = (
  value: unknown,
  name: string,
): asserts value is string => {
  if (typeof value !== "string" && value !== undefined && value !== null) {
    throw new TypeError(
      `Expected ${name} to be an optional string, got ${typeof value}`,
    );
  }
};

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
  callback: async (req, res) => {
    return handleCallback(req, res, {
      afterCallback: async (callbackReq, callbackRes, session) => {
        const {
          user: { sub: id, email, name, picture, updatedAt },
        } = session.user;

        assertString(id, "id");
        assertString(email, "email");
        assertString(name, "name");
        assertOptionalString(picture, "picture");
        assertOptionalString(updatedAt, "updatedAt");

        await prisma.user.upsert({
          where: {
            id,
          },
          update: {
            name,
            picture,
            updatedAt,
          },
          create: {
            email,
            id,
            name,
            picture,
            updatedAt,
          },
        });

        return session;
      },
    });
  },
});

export default withSentry(handler);
