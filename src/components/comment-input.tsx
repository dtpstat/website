import * as React from "react";
import styled from "styled-components";

import { useAccident } from "../providers/accident-provider";
import { useComments } from "../providers/comments-provider";
import { useUser } from "../providers/user-profile-provider";
import { postComment } from "../requests/comments";
import { NewComment } from "../types";
import { AvatarImage } from "./avatar-image";
import { Button } from "./button";
import { Link } from "./link";
import { Textarea } from "./textarea";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- third-party name
    parentIFrame?: {
      autoResize: (value: boolean) => void;
      size: (height: number) => void;
    };
  }
}

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

  // TODO: Remove after migrating all pages to Next.js and removing iframes
  const handleAuthClick = React.useCallback(() => {
    if (window.parentIFrame) {
      const heightNeededForAuth0 = document.body.clientWidth > 480 ? 800 : 690;
      window.parentIFrame.autoResize(false);
      window.parentIFrame.size(heightNeededForAuth0);
    }
  }, []);

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
      <Link href="/api/auth/login">
        <a onClick={handleAuthClick}>авторизуйтесь</a>
      </Link>
      .
    </div>
  );
};
