import { UserProfile } from "@auth0/nextjs-auth0";
import { NextApiHandler } from "next";

import { prisma } from "../../shared/prisma-helper";
import { User } from "../../types";

const getUser = async (auth0userSub?: string): Promise<User> => {
  const users = await prisma.user.findMany({
    where: { auth0userSub },
  });

  return users[0] ?? {};
};

const userProfileToUser = (userProfile: UserProfile): User => {
  return {
    name: userProfile.name,
    email: userProfile.email,
    avatarUrl: userProfile.picture,
    auth0userSub: userProfile.sub,
  } as unknown as User;
};

const createUser = async (userProfile: UserProfile): Promise<User> => {
  const user: User = await prisma.user.create({
    data: userProfileToUser(userProfile),
  });

  return user;
};

const updateUser = async (userProfile: UserProfile): Promise<User> => {
  const user: User = await prisma.user.update({
    data: userProfileToUser(userProfile),
  });

  return user;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const user = await createUser(JSON.parse(req.body) as UserProfile);
    res.status(200).json({ user });
  } else if (req.method === "PATCH") {
    const user = await updateUser(JSON.parse(req.body) as UserProfile);
    res.status(200).json({ user });
  } else {
    res.status(200).json({ user: await getUser() });
  }
};

export default handler;
