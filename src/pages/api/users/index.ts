import { NextApiHandler } from "next";

import { prisma } from "../../../shared/prisma-helper";
import { User } from "../../../types";

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      nickname: true,
      email: true,
      createDate: true,
      updateDate: true,
    },
  });

  return users;
};

const createUser = async (userData: User): Promise<User> => {
  const user: User = await prisma.user.create({
    data: userData,
  });

  return user;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const user = await createUser(JSON.parse(req.body as string) as User);
    res.status(200).json({ user });
  } else if (req.method === "GET") {
    res.status(200).json({ users: await getUsers() });
  }
};

export default handler;
