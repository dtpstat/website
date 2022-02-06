import * as React from "react";
import { unstable_batchedUpdates } from "react-dom";

import { fetchComments } from "../requests/comments";
import { PublicCommentInfo } from "../types";
import { useAccident } from "./accident-provider";

interface CommentsContextValue {
  newCommentText: string;
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
  comments: PublicCommentInfo[];
  commentsAreLoading: boolean;
  setComments: React.Dispatch<React.SetStateAction<PublicCommentInfo[]>>;
}

const CommentsContext = React.createContext<CommentsContextValue | undefined>(
  undefined,
);

export const CommentsProvider: React.VoidFunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [comments, setComments] = React.useState<PublicCommentInfo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [newCommentText, setNewCommentText] = React.useState<string>("");
  const { accidentId } = useAccident();

  React.useEffect(() => {
    let effectIsStale = false;
    setLoading(true);

    const fetchAndSetComments = async () => {
      try {
        const initialComments = await fetchComments(
          window.location.origin,
          accidentId,
        );

        if (!effectIsStale) {
          unstable_batchedUpdates(() => {
            setLoading(false);
            setComments(initialComments);
          });
        }
      } catch {
        setLoading(false);
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
      commentsAreLoading: loading,
      setComments,
    }),
    [newCommentText, comments, loading],
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
