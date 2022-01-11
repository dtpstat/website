import * as React from "react";

import { fetchComments } from "../requests/comments";
import { Comment } from "../types";

interface CommentsContextValue {
  newCommentText: string;
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentsContext = React.createContext<CommentsContextValue | undefined>();

export const CommentsProvider: React.VoidFunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = React.useState<string>("");

  React.useEffect(() => {
    const initFetchComments = async () => {
      const initComments = await fetchComments(window.location.origin);
      setComments(initComments);
    };
    void initFetchComments();
  }, []);

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
