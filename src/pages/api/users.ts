import { NextApiHandler } from "next";

import { prisma } from "../../shared/prisma-helper";
import { User } from "../../types";

const getUser = async (auth0userSub?: string): Promise<User> => {
  const users = await prisma.user.findMany({
    where: { auth0userSub },
  });

  return users[0] ?? {};
};

const createUser = async (newUser: User): Promise<User> => {
  const user: User = await prisma.user.create({
    data: newUser,
  });

  return user;
};

const updateUser = async (updatedUser: User): Promise<User> => {
  const user: User = await prisma.user.update({
    data: updatedUser,
  });

  return user;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const user = await createUser(JSON.parse(req.body) as User);
    res.status(200).json({ user });
  } else if (req.method === "PATCH") {
    const user = await updateUser(JSON.parse(req.body) as User);
    res.status(200).json({ user });
  } else {
    res.status(200).json({ user: await getUser() });
  }
};

export default handler;
