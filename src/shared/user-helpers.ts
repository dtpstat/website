import { UserProfile } from "@auth0/nextjs-auth0";

import { User } from "../types";

export const userProfileToUser = (userProfile: UserProfile): User => {
  return {
    id: userProfile.sub,
    name: userProfile.name,
    nickname: userProfile.nickname,
    email: userProfile.email,
    avatarUrl: userProfile.picture,
    updateDate: userProfile.updated_at,
  } as unknown as User;
};
