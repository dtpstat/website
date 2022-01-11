import { prisma } from "../shared/prisma-helper";
import { User } from "../types";

export const getUser = async (userId: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
};

export const updateUser = async (
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
