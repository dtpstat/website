import { useUser } from "@auth0/nextjs-auth0";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

import { postComment } from "../fetch/comments";
import { patchUser, postUser } from "../fetch/users";
import { getUser } from "../pages/api/users";
import { useComments } from "../providers/comments-provider";
import { userProfileToUser } from "../shared/user-helpers";
import { NewComment } from "../types";
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
  const { setNewCommentText, newCommentText, comments, setComments, baseUrl } =
    useComments();

  const { user } = useUser();

  const userPicture = (user && user.picture) || undefined;

  const createOrUpdateUser = async () => {
    if (!user) {
      throw Error("no user");
    }

    // Check if the user exists
    const dbUser = await getUser(user!.sub as string);
    if (dbUser) {
      await patchUser(baseUrl, userProfileToUser(user));
    } else {
      await postUser(baseUrl, userProfileToUser(user));
    }
  };

  const handleSend = async () => {
    if (!user) {
      throw Error("no user");
    }

    createOrUpdateUser();

    const newComment: NewComment = {
      authorId: user.sub as string,
      text: newCommentText,
    };

    try {
      const comment = await postComment(baseUrl, newComment);

      setComments([...comments, comment]);

      setNewCommentText("");
    } catch (error) {
      // TODO: handleError(error);
    }
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
