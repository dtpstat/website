import { NextApiHandler } from "next";

import { prisma } from "../../shared/prisma-helper";
import { User } from "../../types";

export const getUser = async (auth0userSub?: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { auth0userSub },
  });

  return user;
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
    const user = await createUser(JSON.parse(req.body));
    res.status(200).json({ user });
  } else if (req.method === "PATCH") {
    const user = await updateUser(JSON.parse(req.body));
    res.status(200).json({ user });
  } else {
    res.status(200).json({ user: await getUser() });
  }
};

export default handler;
