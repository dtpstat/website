import { UserProfile } from "@auth0/nextjs-auth0";
import gravatarUrl, { Options } from "gravatar-url";

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
    return;
  }

  const {
    sub: id,
    updated_at: updateDate,
    picture,
    ...profileData
  } = userProfile;

  const avatarUrl =
    picture ?? gravatarUrl(userProfile.email ?? "", defaultGravatarUrlOptions);

  const userData = { id, updateDate, avatarUrl, ...profileData } as User;

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
