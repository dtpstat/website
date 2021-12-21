import { NextApiHandler } from "next";

import { prisma } from "../../shared/prisma-helper";
import { Comment } from "../../types";

const getComments = async () => {
  const comments = await prisma.comment.findMany({
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

const createComment = async (newComment: Comment) => {
  const comment: Comment = await prisma.comment.create({
    data: {
      ...newComment,
    } as Comment,
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

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const comment = await createComment(JSON.parse(req.body) as Comment);
    res.status(200).json({ comment });
  } else {
    res.status(200).json({ comments: await getComments() });
  }
};

export default handler;