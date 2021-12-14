import * as React from "react";

import { Comment } from "../types";
import { CommentItem } from "./comment-item";

export interface CommentsListProps {
  comments: Comment[];
}

export const CommentList: React.VoidFunctionComponent<CommentsListProps> = ({
  comments,
}) => {
  return (
    <div>
      hello {comments?.length}
      {comments.map((comment: Comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};
