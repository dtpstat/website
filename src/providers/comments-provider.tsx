import React from "react";

import { Comment } from "../types";

interface CommentsContextValue {
  newCommentText: string;
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  baseUrl: string;
  setBaseUrl: React.Dispatch<React.SetStateAction<string>>;
}

const CommentsContext = React.createContext<CommentsContextValue | undefined>(
  undefined,
);

export interface CommentsListProps {
  initComments: Comment[];
  initBaseUrl: string;
}

export const CommentsProvider: React.FunctionComponent<CommentsListProps> = ({
  initComments,
  initBaseUrl,
  children,
}) => {
  const [comments, setComments] = React.useState<Comment[]>(initComments);
  const [newCommentText, setNewCommentText] = React.useState<string>("");
  const [baseUrl, setBaseUrl] = React.useState<string>(initBaseUrl);

  const providerValue = React.useMemo<CommentsContextValue>(
    () => ({
      newCommentText,
      setNewCommentText,
      comments,
      setComments,
      baseUrl,
      setBaseUrl,
    }),
    [
      newCommentText,
      setNewCommentText,
      comments,
      setComments,
      baseUrl,
      setBaseUrl,
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
