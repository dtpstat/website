import React from "react";
import styled from "styled-components";

const defaultAvatarUrl = "/icons/avatar_default.svg";

const StyledImg = styled.img`
  border-radius: 50%;
  width: 28px;
  height: 28px;
`;

const ImageContainer = styled.div`
  margin-right: 12px;
`;

interface AvatarImageProps {
  src?: string | null;
}

export const AvatarImage: React.VoidFunctionComponent<AvatarImageProps> = ({
  src,
}) => {
  return (
    <ImageContainer>
      <StyledImg src={src || defaultAvatarUrl} />
    </ImageContainer>
  );
};
