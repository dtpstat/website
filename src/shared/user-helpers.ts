import { UserProfile } from "@auth0/nextjs-auth0";
import gravatarUrl from "gravatar-url";

import { User } from "../types";

export const convertUserProfileToUser = (userProfile: UserProfile): User => {
  return {
    id: userProfile.sub,
    name: userProfile.name,
    nickname: userProfile.nickname,
    email: userProfile.email,
    avatarUrl: userProfile.picture || gravatarUrl(userProfile.email!),
    updateDate: userProfile.updated_at,
  } as User;
};
