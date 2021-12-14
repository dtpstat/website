import React, { ChangeEvent } from "react";
import styled from "styled-components";

import { useComments } from "../providers/comments-provider";
import { Comment } from "../types";
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
  const { setNewCommentText, newCommentText, comments, setComments } =
    useComments();

  const onSend = () => {
    const comment: Comment = {
      id: comments.length,
      user: "anon",
      text: newCommentText,
      date: new Date().toUTCString(),
    };
    setComments([...comments, comment]);
  };

  return (
    <InputContainer>
      <AvatarImage />
      <TextInput
        placeholder="Добавить комментарий..."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewCommentText(e.target.value)
        }
      />
      <Button onClick={() => onSend()}>Отправить</Button>
    </InputContainer>
  );
};
