import * as React from "react";
import styled from "styled-components";

import { useAccident } from "../providers/accident-provider";
import { useComments } from "../providers/comments-provider";
import { fetchComments } from "../requests/comments";
import { Comment } from "../types";
import { CommentItem } from "./comment-item";

const CommentsHeader = styled.h2`
  font-family: ${(props) => props.theme.fontFamily};
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 40px;
  color: #18334a;
`;

export const CommentList: React.VoidFunctionComponent = () => {
  const { setComments, comments } = useComments();
  const { accidentId } = useAccident();
  React.useEffect(() => {
    let commentsSubscribed = true;

    const subscribeComments = async () => {
      if (!commentsSubscribed || !accidentId) {
        return;
      }

      const initialComments = await fetchComments(
        window.location.origin,
        accidentId,
      );
      setComments(initialComments);
    };

    void subscribeComments();

    return () => {
      commentsSubscribed = false;
    };
  }, [accidentId, setComments]);

  return (
    <div>
      <CommentsHeader>Комментарии - {comments.length}</CommentsHeader>
      {comments.map((comment: Comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};
