import { getSession } from "@auth0/nextjs-auth0";
import { Prisma } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

import { prisma } from "../../shared/prisma-helper";
import { generateAvatarUrl } from "../../shared/user-helpers";
import {
  CommentsApiHandlerSuccessfulGetResponseBody,
  CommentsApiHandlerSuccessfulPostResponseBody,
  NewComment,
  PublicCommentInfo,
} from "../../types";

const commentSelect = {
  accidentId: true,
  author: {
    select: {
      name: true,
      email: true,
      picture: true,
    },
  },
  createdAt: true,
  id: true,
  status: true,
  text: true,
} as const;

const convertSelectedCommentToPublicInfo = ({
  accidentId,
  author,
  createdAt,
  id,
  status,
  text,
}: Prisma.CommentGetPayload<{
  select: typeof commentSelect;
}>): PublicCommentInfo => ({
  accidentId,
  authorAvatarUrl: generateAvatarUrl(author.picture ?? undefined, author.email),
  authorName: author.name,
  createdAt: createdAt.toISOString(),
  id,
  status,
  text,
});

const handler: NextApiHandler = async (req, res) => {
  const session = getSession(req, res);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- external user type is `any`
  const myId = session?.user.sub;

  if (req.method === "POST") {
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
  } else if (req.method === "GET") {
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
  } else {
    res.status(405).json({
      error: "method_not_allowed",
      description: "only POST and GET methods are allowed",
    });
  }
};

export default withSentry(handler);
