import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import * as React from "react";

import { CommentInput } from "../../components/comment-input";
import { CommentList } from "../../components/comment-list";
import { AccidentProvider } from "../../providers/accident-provider";
import { CommentsProvider } from "../../providers/comments-provider";
import { commentsArePaused } from "../../shared/comment-helpers";

export interface CommentsIframePageProps {
  accidentId?: string;
}

const CommentsIframePage: NextPage<CommentsIframePageProps> = ({
  accidentId,
}) => {
  const [height, setHeight] = React.useState(100);

  if (!accidentId) {
    return <Error statusCode={404} />;
  }

  return (
    <div style={{ border: "3px solid red" }}>
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
          <div
            style={{
              height,
              userSelect: "none",
              marginTop: 10,
            }}
            onClick={() => {}}
          >
            Дополнителная высота в айфрейме: {height}
            <br />
            <button
              onClick={() => {
                setHeight(Math.round(100 + Math.random() * 300));
              }}
            >
              поменять
            </button>
          </div>
        </CommentsProvider>
      </AccidentProvider>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  CommentsIframePageProps
  // eslint-disable-next-line @typescript-eslint/require-await -- to be removed when we check dtp id
> = async ({ params }) => {
  // Former dtp-id in the prev version
  const accidentId = params?.["accident-id"] as string;

  if (accidentId) {
    // TODO: Check dtp id presence and return { notFound: true } on failure
    return {
      props: {
        accidentId,
      },
    };
  }

  return {
    notFound: true,
  };
};

export default CommentsIframePage;
