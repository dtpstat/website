import * as React from "react";
import styled from "styled-components";

import { generateAvatarUrl } from "../shared/user-helpers";

const defaultAvatarImgAttributes = {
  src: "",
  alt: "аватарка",
  size: 28,
};

const StyledImg = styled.img`
  border-radius: 50%;
  margin-right: 12px;
`;

interface AvatarImageProps {
  /**
   * Can be Auth0 user (i.e. ‘me’) or data from Prisma.
   *
   * If picture is missing but email is present, gravatar URL is generated
   */
  user: {
    name?: string | null | undefined;
    picture?: string | null | undefined;
    email?: string | null | undefined;
  };
  /** With and height */
  size?: number;
}

export const AvatarImage: React.VoidFunctionComponent<AvatarImageProps> = ({
  user,
  size,
}) => {
  const src = generateAvatarUrl(user.picture, user.email);

  return (
    <StyledImg
      referrerPolicy="no-referrer"
      src={src ?? defaultAvatarImgAttributes.src}
      alt={user.name ?? defaultAvatarImgAttributes.alt}
      width={size ?? defaultAvatarImgAttributes.size}
      height={size ?? defaultAvatarImgAttributes.size}
    />
  );
};
