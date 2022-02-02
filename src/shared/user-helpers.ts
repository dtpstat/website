import { UserProfile } from "@auth0/nextjs-auth0";
import { default as gravatarUrl, Options } from "gravatar-url";

import { fetchUser, patchUser, postUser } from "../requests/users";
import { User } from "../types";

const defaultGravatarUrlOptions: Options = {
  size: 100,
  rating: "g",
  default: "mp",
};

export const baseUrl = process.env.AUTH0_BASE_URL ?? "";

export const createOrUpdateDbUser = async (
  userProfile: UserProfile,
): Promise<User | undefined> => {
  const userId = userProfile.sub as string;
  if (!userId) {
    throw new Error("userProfile.sub is required");
  }

  const {
    sub: id = userId,
    updated_at: updateDate,
    picture,
    ...profileData
  } = userProfile;

  const avatarUrl: string =
    picture ?? gravatarUrl(userProfile.email ?? "", defaultGravatarUrlOptions);

  const userData: User = { id, avatarUrl, updateDate, ...profileData };

  // Check if the user exists in the DB
  const dbUser = await fetchUser(baseUrl, userId);

  return await (dbUser
    ? patchUser(baseUrl, userId, {
        ...userData,
        createDate: dbUser.createDate,
      })
    : postUser(baseUrl, {
        ...userData,
        createDate: userData.updateDate,
      }));
};
