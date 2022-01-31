import * as React from "react";
import styled from "styled-components";

const defaultAvatarSizePix = 28;

const StyledImg = styled.img`
  border-radius: 50%;
  margin-right: 12px;
`;

interface AvatarImageProps {
  src?: string | null;
  size?: number;
  alt?: string | null;
}

export const AvatarImage: React.VoidFunctionComponent<AvatarImageProps> = ({
  src,
  alt,
  size,
}) => {
  return (
    <StyledImg
      src={src || ""}
      alt={alt ?? "Avatar Image"}
      width={size || defaultAvatarSizePix}
      height={size || defaultAvatarSizePix}
    />
  );
};
