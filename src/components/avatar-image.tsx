import * as React from "react";
import styled from "styled-components";

const defaultAvatarImg =
  "https://gravatar.com/avatar/6ae852fa3a8b1c79dba3f7dc883c1760?s=200&d=mp&r=x";

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
