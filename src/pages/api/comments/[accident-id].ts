import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

import { createComment, getComments } from "../../../services/comment";
import { NewComment } from "../../../types";

const handler: NextApiHandler = async (req, res) => {
  const accidentId = req.query["accident-id"] as string;

  if (req.method === "POST") {
    return withApiAuthRequired(async () => {
      const comment = await createComment(
        JSON.parse(req.body as string) as NewComment,
      );
      res.status(200).json({ status: "ok", comment });
    })(req, res);
  } else if (req.method === "GET") {
    res
      .status(200)
      .json({ status: "ok", comments: await getComments(accidentId) });
  } else {
    res.status(405).json({
      error: "method_not_allowed",
      description: "only POST and GET methods are allowed",
    });
  }
};

export default withSentry(handler);
