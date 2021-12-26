import { NextApiHandler } from "next";

import { prisma } from "../../../shared/prisma-helper";
import { User } from "../../../types";

export const getUser = async (userId: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { userId },
  });

  return user;
};

const updateUser = async (
  userId: string,
  updatedUser: User,
): Promise<User | null> => {
  const user: User = await prisma.user.update({
    where: {
      userId,
    },
    data: updatedUser,
  });

  return user;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PATCH" && req.query["userId"]) {
    const user = await updateUser(
      req.query["userId"] as string,
      JSON.parse(req.body),
    );
    res.status(200).json({ user });
  } else if (req.method === "GET" && req.query["userId"]) {
    res
      .status(200)
      .json({ user: await getUser(req.query["userId"] as string) });
  }
};

export default handler;
