import Image from "next/image";
import React from "react";
import styled from "styled-components";

import defaultAvatarImg from "/public/icons/avatar_default.svg";

const StyledImg = styled(Image)`
  border-radius: 50%;
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
      <StyledImg src={src ?? defaultAvatarImg} width={28} height={28} />
    </ImageContainer>
  );
};
