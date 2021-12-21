import { Comment as PrismaComment, User } from "@prisma/client";

export interface NewComment {
  text?: string;
  authorId?: string;
}

interface Comment extends PrismaComment {
  author?: User;
}

export type { Comment, User };
