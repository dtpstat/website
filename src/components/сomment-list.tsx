import * as React from "react";

import { useComments } from "../providers/comments-provider";
import { Comment } from "../types";
import { CommentItem } from "./comment-item";

export const CommentList: React.VoidFunctionComponent = () => {
  const { comments } = useComments();

  return (
    <div>
      {comments.map((comment: Comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};
