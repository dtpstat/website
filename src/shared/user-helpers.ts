import { UserProfile } from "@auth0/nextjs-auth0";

import { User } from "../types";

export const userProfileToUser = (userProfile: UserProfile): User => {
  return {
    name: userProfile.name,
    email: userProfile.email,
    avatarUrl: userProfile.picture,
    userId: userProfile.sub,
  } as unknown as User;
};
