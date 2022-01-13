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

  &:disabled {
    color: rgb(133, 133, 133);
  }
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
  multiline?: boolean;
  disabled?: boolean;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit?: () => void;
}

export const TextInput: React.VoidFunctionComponent<TextInputProps> = ({
  placeholder,
  multiline,
  disabled,
  value,
  onChange,
  onSubmit,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<Element>) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      onSubmit?.();
    }
  };

  return multiline ? (
    <StyledTextArea
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      value={value}
    />
  ) : (
    <StyledTextInput
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      value={value}
    />
  );
};
