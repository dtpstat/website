import * as React from "react";
import styled from "styled-components";

import { useAccident } from "../providers/accident-provider";
import { useComments } from "../providers/comments-provider";
import { useUser } from "../providers/user-profile-provider";
import { postComment } from "../requests/comments";
import { popupCenter } from "../shared/ui-helpers";
import { NewComment } from "../types";
import { AvatarImage } from "./avatar-image";
import { Button } from "./button";
import { StyledLink } from "./link";
import { Textarea } from "./textarea";

const InputContainer = styled.div`
  background: rgba(24, 51, 74, 0.1);
  border-radius: 4px;
  color: #18334a;
  display: flex;
  flex: none;
  order: 3;
  flex-grow: 0;
  margin: 0 0 16px;
  padding: 12px;
  align-items: start;
  justify-content: space-between;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const CommentInput: React.VoidFunctionComponent = () => {
  const { setNewCommentText, newCommentText, comments, setComments } =
    useComments();
  const { user } = useUser();
  const { accidentId } = useAccident();
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    if (!user) {
      throw new Error("no user");
    }

    if (!newCommentText) {
      return;
    }

    const newComment: NewComment = {
      accidentId,
      authorId: user.id,
      text: newCommentText,
    };

    try {
      setSubmitting(true);
      const comment = await postComment(window.location.origin, newComment);

      setComments([...comments, comment]);
      setNewCommentText("");
    } catch {
      // TODO: handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(event.target.value);
  };

  const openLoginWindow = () => {
    popupCenter(window, {
      url: "/api/auth/login",
      title: "Auth",
      w: 500,
      h: 800,
    });
  };

  return user ? (
    <InputContainer>
      <AvatarImage email={user.email} />
      <Textarea
        placeholder="Добавить комментарий..."
        disabled={submitting}
        value={newCommentText}
        onSubmit={handleSubmit}
        onChange={handleTextChange}
      />
      <SubmitButtonContainer>
        <Button
          onClick={handleSubmit}
          disabled={newCommentText.length === 0 || submitting}
        >
          Отправить
        </Button>
        <span>Ctrl + Enter</span>
      </SubmitButtonContainer>
    </InputContainer>
  ) : (
    <div>
      Для оставления комментария{" "}
      <StyledLink
        onClick={() => {
          openLoginWindow();
        }}
      >
        авторизуйтесь
      </StyledLink>
    </div>
  );
};
