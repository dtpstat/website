import { getSession } from "@auth0/nextjs-auth0";
import { Prisma } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import { NextApiHandler } from "next";

import { prisma } from "../../shared/prisma-helper";
import { generateAvatarUrl } from "../../shared/user-helpers";
import {
  CommentsApiHandlerSuccessfulGetResponseBody,
  CommentsApiHandlerSuccessfulPostResponseBody,
  NewCommentPayload,
  PublicCommentInfo,
} from "../../types";

const publicCommentInfoSelect = {
  accidentId: true,
  id: true,
  text: true,
  createdAt: true,
  author: {
    select: {
      name: true,
      email: true,
      picture: true,
    },
  },
} as const;

const extractCommentPublicInfo = ({
  accidentId,
  author,
  createdAt,
  id,
  text,
}: Prisma.CommentGetPayload<{
  select: typeof publicCommentInfoSelect;
}>): PublicCommentInfo => ({
  accidentId,
  authorName: author.name,
  authorAvatarUrl: generateAvatarUrl(author.picture ?? undefined, author.email),
  createdAt: createdAt.toISOString(),
  id,
  isPublished: true,
  text,
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const session = getSession(req, res);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- external user type is `any`
    const authorId = session?.user.sub;

    if (typeof authorId !== "string") {
      res.status(401).json({
        error: "not_authenticated",
        description:
          "The user does not have an active session or is not authenticated",
      });

      return;
    }

    let newCommentPayload: NewCommentPayload | undefined;

    try {
      const { accidentId, text } = JSON.parse(req.body as string) as Record<
        keyof NewCommentPayload,
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

      newCommentPayload = { accidentId, text };
    } catch {
      res.status(422).json({
        error: "invalid_payload",
        description: "New comment payload is corrupt and cannot be processed",
      });

      return;
    }

    const selectedCommentData = await prisma.comment.create({
      data: {
        ...newCommentPayload,
        authorId,
      },
      select: publicCommentInfoSelect,
    });

    const responseBody: CommentsApiHandlerSuccessfulPostResponseBody = {
      status: "ok",
      comment: extractCommentPublicInfo(selectedCommentData),
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
    const commentsWithAuthor = await prisma.comment.findMany({
      where: {
        isPublished: true,
        accidentId,
      },
      select: publicCommentInfoSelect,
    });

    const responseBody: CommentsApiHandlerSuccessfulGetResponseBody = {
      status: "ok",
      comments: commentsWithAuthor.map((selectedCommentData) =>
        extractCommentPublicInfo(selectedCommentData),
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
