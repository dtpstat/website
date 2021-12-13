import React from "react";
import styled from "styled-components";

import { AvatarImage } from "./avatar-image";
import { Button } from "./button";
import { TextInput } from "./text-input";

const InputContainer = styled.div`
  height: 54px;
  background: rgba(24, 51, 74, 0.1);
  border-radius: 4px;
  display: flex;
  flex: none;
  order: 3;
  flex-grow: 0;
  margin: 0 0 16px;
  padding: 12px;
  align-items: center;
  justify-content: space-between;
`;

export const CommentInput: React.VoidFunctionComponent = () => {
  return (
    <InputContainer>
      <AvatarImage />
      <TextInput placeholder="Добавить комментарий..." />
      <Button>Отправить</Button>
    </InputContainer>
  );
};
