import { NextApiHandler } from "next";

import { prisma } from "../../shared/prisma-helper";
import { getUser } from "./users";
// import { Comment } from "../../types";
import { Comment } from ".prisma/client";

const getComments = async () => {
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

const createComment = async (newComment: Comment) => {
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

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const comment = await createComment(JSON.parse(req.body));
    res.status(200).json({ comment });
  } else {
    res.status(200).json({ comments: await getComments() });
  }
};

export default handler;
