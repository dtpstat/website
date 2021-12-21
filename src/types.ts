import { Comment as PrismaComment, User } from "@prisma/client";

export interface NewComment {
  id?: number;
  text?: string;
  authorId: string;
}

export interface CommentUser {
  avatarUrl?: string | null;
  name?: string | null;
}

interface Comment extends PrismaComment {
  author?: CommentUser;
}

export type { Comment, User };
