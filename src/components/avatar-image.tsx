import * as React from "react";
import styled from "styled-components";

const defaultAvatarSizePix = 28;

const StyledImg = styled.img`
  border-radius: 50%;
  width: ${defaultAvatarSizePix}px;
  height: ${defaultAvatarSizePix}px;
  margin-right: 12px;
`;

interface AvatarImageProps {
  src?: string | null;
  size?: number;
  alt?: string;
}

export const AvatarImage: React.VoidFunctionComponent<AvatarImageProps> = ({
  src,
  alt,
}) => {
  return <StyledImg src={src || ""} alt={alt ?? "Avatar Image"} />;
};
