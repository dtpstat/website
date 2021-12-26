import { NextApiHandler } from "next";

import { prisma } from "../../../shared/prisma-helper";
import { User } from "../../../types";

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      email: false,
    },
  });

  return users as User[];
};

const createUser = async (newUser: User): Promise<User> => {
  const user: User = await prisma.user.create({
    data: newUser,
  });

  return user;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const user = await createUser(JSON.parse(req.body));
    res.status(200).json({ user });
  } else if (req.method === "GET") {
    res.status(200).json({ users: await getUsers() });
  }
};

export default handler;
