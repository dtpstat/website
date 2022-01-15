import * as React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  border: none;
  background: none;
  color: #18334a;
  flex: 1 1 auto;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  outline: none;
  letter-spacing: 0.15px;
  line-height: 20px;
  mix-blend-mode: normal;
  min-height: 60px;
  width: 100%;

  &:disabled {
    color: rgb(133, 133, 133);
  }
`;

interface TextareaProps {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: () => void;
}

export const Textarea: React.VoidFunctionComponent<TextareaProps> = ({
  placeholder,
  disabled,
  value,
  onChange,
  onSubmit,
}) => {
  const handleKeyDown: React.KeyboardEventHandler = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <StyledTextArea
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      value={value}
    />
  );
};
