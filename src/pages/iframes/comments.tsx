import { NextPage } from "next";
import dynamic from "next/dynamic";
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
    isReady,
  } = useRouter();

  if (!isReady) {
    return <></>;
  }

  if (typeof accidentId !== "string" || !accidentId) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
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

export default dynamic(
  // eslint-disable-next-line @typescript-eslint/require-await
  async () => CommentsIframePage,
  { ssr: false },
);
