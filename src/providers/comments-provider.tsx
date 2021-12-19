import React from "react";

import { Comment } from "../types";

interface CommentsContextValue {
  newCommentText: string;
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  commentsApiUrl: string;
  setCommentsApiUrl: React.Dispatch<React.SetStateAction<string>>;
}

const CommentsContext = React.createContext<CommentsContextValue | undefined>(
  undefined,
);

export interface CommentsListProps {
  initComments: Comment[];
  initCommentsApiUrl: string;
}

export const CommentsProvider: React.FunctionComponent<CommentsListProps> = ({
  initComments,
  initCommentsApiUrl,
  children,
}) => {
  const [comments, setComments] = React.useState<Comment[]>(initComments);
  const [newCommentText, setNewCommentText] = React.useState<string>("");
  const [commentsApiUrl, setCommentsApiUrl] =
    React.useState<string>(initCommentsApiUrl);

  const providerValue = React.useMemo<CommentsContextValue>(
    () => ({
      newCommentText,
      setNewCommentText,
      comments,
      setComments,
      commentsApiUrl,
      setCommentsApiUrl,
    }),
    [
      newCommentText,
      setNewCommentText,
      comments,
      setComments,
      commentsApiUrl,
      setCommentsApiUrl,
    ],
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
