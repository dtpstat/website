import React from "react";

import { Comment } from "../types";

interface CommentsContextValue {
  newCommentText: string;
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentsContext = React.createContext<CommentsContextValue | undefined>(
  undefined,
);

export interface CommentsListProps {
  initComments: Comment[];
}

export const CommentsProvider: React.FunctionComponent<CommentsListProps> = ({
  initComments,
  children,
}) => {
  const [comments, setComments] = React.useState<Comment[]>(initComments);
  const [newCommentText, setNewCommentText] = React.useState<string>("");

  const providerValue = React.useMemo<CommentsContextValue>(
    () => ({
      newCommentText,
      setNewCommentText,
      comments,
      setComments,
    }),
    [newCommentText, setNewCommentText, comments, setComments],
  );

  return (
    <CommentsContext.Provider value={providerValue}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = (): CommentsContextValue => {
  const result = React.useContext(CommentsContext);
  if (result === undefined) {
    throw new Error("No CommentsContext value available");
  }

  return result;
};
