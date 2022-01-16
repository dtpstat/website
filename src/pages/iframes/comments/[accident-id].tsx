import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import * as React from "react";

import { CommentInput } from "../../../components/comment-input";
import { CommentList } from "../../../components/comment-list";
import { AccidentProvider } from "../../../providers/accident-provider";
import { CommentsProvider } from "../../../providers/comments-provider";
import { commentsArePaused } from "../../../shared/comment-helpers";

export interface CommentsIframePageProps {
  accidentId?: string;
}

const CommentsIframePage: NextPage<CommentsIframePageProps> = ({
  accidentId,
}) => {
  if (!accidentId) {
    return <Error statusCode={404} />;
  }

  return (
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
