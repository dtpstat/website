import * as React from "react";
import Gravatar from "react-gravatar";
import styled from "styled-components";

const defaultAvatarSizePix = 28;

const StyledGravatar = styled(Gravatar)`
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const ImageContainer = styled.div`
  margin-right: 12px;
`;

interface AvatarImageProps {
  email?: string | null;
  size?: number;
}

export const AvatarImage: React.VoidFunctionComponent<AvatarImageProps> = ({
  email,
  size,
}) => {
  return (
    <ImageContainer>
      <StyledGravatar
        email={email || ""}
        default="mp"
        rating="g"
        size={size || defaultAvatarSizePix}
      />
    </ImageContainer>
  );
};
