import { inject, observer } from "mobx-react";
import * as React from "react";

import { RootStore } from "../stores";
import { Comment } from "../types";
import { CommentItem } from "./comment-item";

export interface CommentsListProps {
  rootStore?: RootStore;
}

const CommentListComponent: React.VoidFunctionComponent<CommentsListProps> = ({
  rootStore,
}) => {
  return (
    <div>
      {rootStore!.commentStore.comments.map((comment: Comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export const CommentList = inject(RootStore.storeName)(
  observer(CommentListComponent),
);
