import * as React from "react";
import styled from "styled-components";

const defaultAvatarImgAttributes = {
  src: "",
  alt: "аваратрка",
  width: 28,
  height: 28,
};

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
      src={src ?? defaultAvatarImgAttributes.src}
      alt={alt ?? defaultAvatarImgAttributes.alt}
      width={size || defaultAvatarImgAttributes.width}
      height={size || defaultAvatarImgAttributes.height}
    />
  );
};
