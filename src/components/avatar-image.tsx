import * as React from "react";
import Gravatar from "react-gravatar";
import styled from "styled-components";

const StyledGravatar = styled(Gravatar)`
  border-radius: 50%;
  width: 28px;
  height: 28px;
`;

const ImageContainer = styled.div`
  margin-right: 12px;
`;

interface AvatarImageProps {
  email?: string | null;
}

export const AvatarImage: React.VoidFunctionComponent<AvatarImageProps> = ({
  email,
}) => {
  return (
    <ImageContainer>
      <StyledImg email={email || ""} default="wavatar" rating="g" />
    </ImageContainer>
  );
};
