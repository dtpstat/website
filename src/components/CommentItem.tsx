import * as React from "react";

import { Comment } from "../types";

const defaultAvatarImg =
  "https://gravatar.com/avatar/6ae852fa3a8b1c79dba3f7dc883c1760?s=200&d=mp&r=x";

export interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.VoidFunctionComponent<CommentItemProps> = ({
  comment,
}) => {
  return (
    <div>
      <img width={50} height={50} src={comment.avatarUrl ?? defaultAvatarImg} />
      <div>
        <span>{comment.user}</span>: <span>{comment.date}</span>
      </div>
      <p>{comment.text}</p>
    </div>
  );
};
