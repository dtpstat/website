import { getSession } from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

import {
  commentSelect,
  convertSelectedCommentToPublicInfo,
} from "../../../shared/comment-helpers";
import { prisma } from "../../../shared/prisma-helper";
import {
  CommentsApiHandlerSuccessfulPostResponseBody,
  NewComment,
} from "../../../types";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      error: "method_not_allowed",
      description: "only POST method is allowed",
    });

    return;
  }

  const session = getSession(req, res);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- external user type is `any`
  const myId = session?.user.sub;

  if (typeof myId !== "string") {
    res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

    return;
  }

  let newComment: NewComment | undefined;

  try {
    const { accidentId, text } = JSON.parse(req.body as string) as Record<
      keyof NewComment,
      unknown
    >; // type casting is tolerable as we are inside try/catch

    if (
      typeof accidentId !== "string" ||
      typeof text !== "string" ||
      !accidentId ||
      !text
    ) {
      throw new Error("Unexpected field types or fields are empty");
    }

    newComment = { accidentId, text };
  } catch {
    res.status(422).json({
      error: "invalid_payload",
      description: "New comment payload is corrupt and cannot be processed",
    });

    return;
  }

  const selectedComment = await prisma.comment.create({
    data: {
      ...newComment,
      authorId: myId,
    },
    select: commentSelect,
  });

  const responseBody: CommentsApiHandlerSuccessfulPostResponseBody = {
    status: "ok",
    comment: convertSelectedCommentToPublicInfo(selectedComment),
  };
  res.status(200).json(responseBody);
};

export default withSentry(handler);
