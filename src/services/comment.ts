import { prisma } from "../shared/prisma-helper";
import { Comment, NewComment } from "../types";
import { getUser } from "./user";

export const getComments = async (): Promise<Comment[]> => {
  const comments = await prisma.comment.findMany({
    where: {
      isPublished: true,
    },
    include: {
      author: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
    },
  });

  return comments;
};

export const createComment = async (
  newComment: NewComment,
): Promise<Comment> => {
  const user = await getUser(newComment.authorId);

  if (!user) {
    throw Error(`User id ${newComment.authorId} does not exists`);
  }

  const comment: Comment = await prisma.comment.create({
    data: {
      ...newComment,
    },
    include: {
      author: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
    },
  });

  return comment;
};
