import { useUser } from "@auth0/nextjs-auth0";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

import { useComments } from "../providers/comments-provider";
import { Comment } from "../types";
import { AvatarImage } from "./avatar-image";
import { Button } from "./button";
import { Link } from "./link";
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
  const { user } = useUser();
  const { setNewCommentText, newCommentText, comments, setComments } =
    useComments();

  const userPicture = (user && user.picture) || undefined;
  const userName = (user && user.name) || "Anonymous";

  const handleSend = () => {
    const comment: Comment = {
      id: comments.length + 1,
      user: userName,
      text: newCommentText,
      date: new Date().toUTCString(),
      avatarUrl: userPicture,
    };
    setComments([...comments, comment]);
    setNewCommentText("");
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewCommentText(event.target.value);

  return user ? (
    <InputContainer>
      <AvatarImage src={userPicture} />
      <TextInput
        placeholder="Добавить комментарий..."
        value={newCommentText}
        onChange={handleTextChange}
      />
      <Button onClick={handleSend}>Отправить</Button>
    </InputContainer>
  ) : (
    <div>
      Для оставления комментария{" "}
      <Link href="/api/auth/login">авторизуйтесь</Link>.
    </div>
  );
};
