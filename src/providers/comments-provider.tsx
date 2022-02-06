import * as React from "react";

import { fetchComments } from "../requests/comments";
import { PublicCommentInfo } from "../types";
import { useAccident } from "./accident-provider";

interface CommentsContextValue {
  newCommentText: string;
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
  comments: PublicCommentInfo[];
  setComments: React.Dispatch<React.SetStateAction<PublicCommentInfo[]>>;
}

const CommentsContext = React.createContext<CommentsContextValue | undefined>(
  undefined,
);

export const CommentsProvider: React.VoidFunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [comments, setComments] = React.useState<PublicCommentInfo[]>([]);
  const [newCommentText, setNewCommentText] = React.useState<string>("");
  const { accidentId } = useAccident();

  React.useEffect(() => {
    let effectIsStale = false;

    const fetchAndSetComments = async () => {
      const initialComments = await fetchComments(accidentId);

      if (!effectIsStale) {
        setComments(initialComments);
      }
    };

    void fetchAndSetComments();

    return () => {
      effectIsStale = true;
    };
  }, [accidentId]);
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
