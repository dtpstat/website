import { UserProfile } from "@auth0/nextjs-auth0";

import { fetchUser, patchUser, postUser } from "../requests/users";
import { User } from "../types";

export const baseUrl = process.env.AUTH0_BASE_URL ?? "";

export const userProfileToUser = (userProfile: UserProfile): User => {
  return {
    id: userProfile.sub,
    name: userProfile.name,
    nickname: userProfile.nickname,
    email: userProfile.email,
    updateDate: userProfile.updated_at,
  } as User;
};

export const createOrUpdateDbUser = async (
  userId: string,
  userData: User,
): Promise<User | undefined> => {
  if (!userId) {
    return;
  }

  // Check if the user exists in the DB
  const dbUser = await fetchUser(baseUrl, userId);

  return await (dbUser
    ? patchUser(baseUrl, userId, {
        ...userData,
      })
    : postUser(baseUrl, {
        ...userData,
        createDate: userData.updateDate,
      }));
};
