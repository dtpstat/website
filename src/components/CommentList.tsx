import * as React from "react";

import { Comment } from "../types";
import { CommentItem } from "./CommentItem";

const comments: Comment[] = [
  {
    id: 1,
    text: "Myaw-myaw",
    user: "Kitty",
    avatarUrl:
      "https://robohash.org/6ae852fa3a8b1c79dba3f7dc883c1760?set=set4&bgset=&size=200x200",
  },
  {
    id: 2,
    text: "Comment 2",
    user: "Kolya",
  },
];

export const CommentList: React.VoidFunctionComponent = () => {
  return (
    <div>
      <h2>Комментарии - {comments.length}</h2>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};
