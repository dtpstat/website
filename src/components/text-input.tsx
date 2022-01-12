import * as React from "react";
import styled from "styled-components";

const commonInputStyles = `  
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

const StyledTextInput = styled.input`
  ${commonInputStyles}
  font-family: ${(props) => props.theme.fontFamily};
`;

const StyledTextArea = styled.textarea`
  ${commonInputStyles}
  font-family: ${(props) => props.theme.fontFamily};
  flex: 1 1 auto;
  min-height: 60px;
`;

interface TextInputProps {
  placeholder?: string;
  isMultiline?: boolean;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const TextInput: React.VoidFunctionComponent<TextInputProps> = ({
  placeholder,
  isMultiline,
  value,
  onChange,
}) => {
  return isMultiline ? (
    <StyledTextArea
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  ) : (
    <StyledTextInput
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
