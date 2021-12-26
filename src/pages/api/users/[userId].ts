import { NextApiHandler } from "next";

import { prisma } from "../../../shared/prisma-helper";
import { User } from "../../../types";

export const getUser = async (auth0userSub: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { auth0userSub },
  });

  return user;
};

const updateUser = async (
  auth0userSub: string,
  updatedUser: User,
): Promise<User | null> => {
  const user: User = await prisma.user.update({
    where: {
      auth0userSub,
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
