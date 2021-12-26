import React from "react";
import styled from "styled-components";

import defaultAvatarImg from "/public/icons/avatar_default.svg";

const StyledImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 12px;
`;

interface AvatarImageProps {
  src?: string | null;
}

export const AvatarImage: React.VoidFunctionComponent<AvatarImageProps> = ({
  src,
}) => {
  return <StyledImg src={src ?? defaultAvatarImg} />;
};
