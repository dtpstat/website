import { NextApiHandler } from "next";

import { prisma } from "../../../shared/prisma-helper";
import { User } from "../../../types";

export const getUser = async (userId: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
};

const updateUser = async (
  userId: string,
  updatedUser: User,
): Promise<User | null> => {
  const user: User = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updatedUser,
  });

  return user;
};

const handler: NextApiHandler = async (req, res) => {
  const userId = req.query["userId"] as string;

  if (req.method === "PATCH" && userId) {
    const user = await updateUser(userId, JSON.parse(req.body));
    res.status(200).json({ user });
  } else if (req.method === "GET" && userId) {
    res.status(200).json({ user: await getUser(userId) });
  }
};

export default handler;
