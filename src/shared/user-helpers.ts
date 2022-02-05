import { default as gravatarUrl, Options } from "gravatar-url";

const defaultGravatarUrlOptions: Options = {
  size: 100,
  rating: "g",
  default: "mp",
};

export const generateAvatarUrl = (
  picture: string | undefined | null,
  email: string | undefined | null,
): string | undefined => {
  if (picture) {
    return picture;
  }
  if (!email) {
    return;
  }

  return gravatarUrl(email, defaultGravatarUrlOptions);
};
