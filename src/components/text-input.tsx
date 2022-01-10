import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

import { themeFontFamily } from "../styles/main-theme";

const StyledInput = styled.input`
  font-family: ${themeFontFamily};
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
  placeholder?: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const TextInput: React.VoidFunctionComponent<TextInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <StyledInput placeholder={placeholder} onChange={onChange} value={value} />
  );
};
