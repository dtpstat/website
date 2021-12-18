import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

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
  const users = await prisma.users.findMany({
    where: { id: commentOne.userId },
  });
  commentOne.user = users[0] ?? {};
  commentOne.createDate = commentOne.createDate.toUTCString();

  return [commentOne];
};

const handler: NextApiHandler = async (req, res) => {
  res.status(200).json({ comments: await getComments() });
};

export default handler;
