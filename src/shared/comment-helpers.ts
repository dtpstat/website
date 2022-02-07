import { Prisma } from "@prisma/client";

import { PublicCommentInfo } from "../types";
import { generateAvatarUrl } from "./user-helpers";

export const commentsArePaused =
  process.env.NEXT_PUBLIC_COMMENTS_ARE_PAUSED === "true";

export const commentSelect = {
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

export const convertSelectedCommentToPublicInfo = ({
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
