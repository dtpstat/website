import { UserProfile } from "@auth0/nextjs-auth0";
import gravatarUrl, { Options } from "gravatar-url";

import { User } from "../types";

const defaultGravatarUrlOptions = {
  size: 100,
  rating: "g",
  default: "mp",
} as Options;

export const convertUserProfileToUser = (userProfile: UserProfile): User => {
  return {
    id: userProfile.sub,
    name: userProfile.name,
    nickname: userProfile.nickname,
    email: userProfile.email,
    avatarUrl:
      userProfile.picture ||
      gravatarUrl(userProfile.email!, defaultGravatarUrlOptions),
    updateDate: userProfile.updated_at,
  } as User;
};
