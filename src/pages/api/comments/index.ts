import { getSession } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

import {
  commentSelect,
  convertSelectedCommentToPublicInfo,
} from "../../../shared/comment-helpers";
import { prisma } from "../../../shared/prisma-helper";
import { CommentsApiHandlerSuccessfulGetResponseBody } from "../../../types";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({
      error: "method_not_allowed",
      description: "only GET method is allowed",
    });

    return;
  }

  const session = getSession(req, res);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- external user type is `any`
  const myId = session?.user.sub;

  const accidentId = req.query["accident-id"];

  if (typeof accidentId !== "string" || !accidentId) {
    res.status(422).json({
      error: "missing_param",
      description: "query param accident-id is missing",
    });

    return;
  }

  const selectedComments = await prisma.comment.findMany({
    where: {
      OR: [
        {
          status: "approved",
          accidentId,
        },
        ...(typeof myId === "string"
          ? [
              {
                accidentId,
                authorId: myId,
                status: "pending",
              } as const,
            ]
          : []),
      ],
    },
    select: commentSelect,
    orderBy: {
      id: "asc",
    },
  });

  const responseBody: CommentsApiHandlerSuccessfulGetResponseBody = {
    status: "ok",
    comments: selectedComments.map((selectedComment) =>
      convertSelectedCommentToPublicInfo(selectedComment),
    ),
  };
  res.status(200).json(responseBody);
};

export default withSentry(handler);
