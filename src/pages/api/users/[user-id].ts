import {
  getSession,
  UserProfile,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

import { getUser, updateUser } from "../../../services/user";

interface Session {
  user: UserProfile;
}

const handler: NextApiHandler = async (req, res) => {
  const userId = req.query["user-id"] as string;
  const { user: sessionUser } = getSession(req, res) as Session;

  if (!userId) {
    res.status(422).json({
      error: "missing_param",
      description: "query param user-id is missing",
    });

    return;
  }

  if (userId !== sessionUser.sub) {
    res.status(403).json({
      error: "forbidden",
      description: `you are not authorized for access user-id '${userId}'`,
    });

    return;
  }

  if (req.method === "PATCH") {
    const user = await updateUser(
      userId,
      JSON.parse(req.body as string) as User,
    );
    res.status(200).json({ status: "ok", user });
  } else if (req.method === "GET") {
    res.status(200).json({ status: "ok", user: await getUser(userId) });
  } else {
    res.status(405).json({
      error: "method_not_allowed",
      description: "only PATCH and GET methods are allowed",
    });
  }
};

export default withSentry(withApiAuthRequired(handler));
