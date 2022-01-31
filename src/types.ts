import { Comment as PrismaComment } from "@prisma/client";

export interface NewComment {
  id?: number;
  text?: string;
  authorId: string;
  accidentId: string;
}

export interface CommentUser {
  name?: string | null;
  avatarUrl?: string | null;
}

interface Comment extends PrismaComment {
  author?: CommentUser;
}

export type { Comment };

export type { User } from "@prisma/client";
