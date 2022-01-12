import * as React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  font-family: ${(props) => props.theme.fontFamily};
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
  outline: none;
`;

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
