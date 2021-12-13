import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.15px;
  color: #18334a;
  mix-blend-mode: normal;
  border: none;
  background: none;
  width: 100%;
`;

interface TextInputProps {
  placeholder: string;
}

export const TextInput: React.VoidFunctionComponent<TextInputProps> = ({
  placeholder,
}) => {
  return <StyledInput placeholder={placeholder} />;
};
