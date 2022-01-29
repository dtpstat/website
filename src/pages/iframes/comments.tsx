import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import * as React from "react";

import { CommentInput } from "../../components/comment-input";
import { CommentList } from "../../components/comment-list";
import { AccidentProvider } from "../../providers/accident-provider";
import { CommentsProvider } from "../../providers/comments-provider";
import { commentsArePaused } from "../../shared/comment-helpers";

const CommentsIframePage: NextPage = () => {
  const {
    query: { "accident-id": accidentId },
    isReady: routerIsReady,
  } = useRouter();

  // Prevent tree mismatch between server and client on initial render
  const [client, setClient] = React.useState(false);
  React.useEffect(() => {
    setClient(true);
  }, []);

  if (!client || !routerIsReady) {
    return <></>;
  }

  if (typeof accidentId !== "string" || !accidentId) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts -- temp exception while we need iframes */}
      <script src="/iframes/iframe-resizer.content-window.min.js" />
      <AccidentProvider initAccidentId={accidentId}>
        <CommentsProvider>
          <CommentList />
          {commentsArePaused ? (
            <p>Добавление новых комментариев приостановлено</p>
          ) : (
            <CommentInput />
          )}
        </CommentsProvider>
      </AccidentProvider>
    </>
  );
};

export default CommentsIframePage;
