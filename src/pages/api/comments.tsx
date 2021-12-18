import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export const getComments = async () => {
  const comments = await prisma.comments.findMany({});
  const commentOne = comments[0];
  const users = await prisma.users.findMany({
    where: { id: commentOne.userId },
  });
  commentOne.user = users[0] ?? {};
  commentOne.createDate = commentOne.createDate.toUTCString();

  return [commentOne];
};
