import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

import { Comment, User } from "../../types";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const getComments = async () => {
  const comments = await prisma.comments.findMany({});
  const commentOne = comments[0];

  commentOne.user = await getUser(commentOne.auth0userSub);
  commentOne.createDate = commentOne.createDate.toUTCString();

  return [commentOne];
};

const getUser = async (auth0userSub?: string): Promise<User> => {
  const users = await prisma.users.findMany({
    where: { auth0userSub },
  });

  return users[0] ?? {};
};

const addComment = async (newComment: Comment) => {
  const comment: Comment = await prisma.comments.create({
    data: {
      ...newComment,
    } as Comment,
  });
  const user = await getUser(newComment.auth0userSub);
  comment.user = user;

  return comment;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const comment = await addComment(JSON.parse(req.body) as Comment);
    res.status(200).json({ comment });
  } else {
    res.status(200).json({ comments: await getComments() });
  }
};

export default handler;
