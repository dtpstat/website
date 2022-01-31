import { UserProfile } from "@auth0/nextjs-auth0";
import md5 from "md5";
import querystring from "query-string";

import { User } from "../types";

export interface GravatarUrlProps {
  email?: string | null;
  size?: number;
  rating?: string;
  theme?: string;
  protocol?: string;
  domain?: string;
}
const defaultGravatarUrlProps = {
  email: undefined,
  size: 50,
  rating: "g",
  theme: "mp",
  protocol: "//",
  domain: "www.gravatar.com",
};

export const getGravatarUrlByEmail = (customProps: GravatarUrlProps) => {
  const props = { ...defaultGravatarUrlProps, ...customProps };

  const base = `${props.protocol}${props.domain}/avatar/`;

  const retinaQuery = querystring.stringify({
    s: props.size * 2,
    r: props.rating,
    d: props.theme,
  });

  // Gravatar service currently trims and lowercases all registered emails
  const formattedEmail = props.email
    ? `${props.email}`.trim().toLowerCase()
    : "";

  const hash = md5(formattedEmail, { encoding: "binary" });

  const retinaSrc = `${base}${hash}?${retinaQuery}`;

  return retinaSrc;
};

export const userProfileToUser = (userProfile: UserProfile): User => {
  return {
    id: userProfile.sub,
    name: userProfile.name,
    nickname: userProfile.nickname,
    email: userProfile.email,
    avatarUrl: getGravatarUrlByEmail({ email: userProfile.email }),
    updateDate: userProfile.updated_at,
  } as User;
};
