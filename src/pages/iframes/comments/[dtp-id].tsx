import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import * as React from "react";

import { CommentInput } from "../../../components/comment-input";
import { CommentList } from "../../../components/comment-list";
import { CommentsProvider } from "../../../providers/comments-provider";
import { commentsArePaused } from "../../../shared/comment-helpers";

export interface CommentsIframePageProps {
  dtpId?: number;
}

const CommentsIframePage: NextPage<CommentsIframePageProps> = ({ dtpId }) => {
  if (!dtpId) {
    return <Error statusCode={404} />;
  }

  return (
    <CommentsProvider>
      <CommentList />

      {commentsArePaused ? (
        <p>Добавление новых комментариев приостановлено</p>
      ) : (
        <CommentInput />
      )}
    </CommentsProvider>
  );
};

export const getServerSideProps: GetServerSideProps<
  CommentsIframePageProps
  // eslint-disable-next-line @typescript-eslint/require-await -- to be removed when we check dtp id
> = async ({ params }) => {
  const rawDtpId =
    typeof params?.["dtp-id"] === "string" ? params["dtp-id"] : "";
  const parsedDtpId = Number.parseInt(rawDtpId);
  const dtpId = `${parsedDtpId}` === rawDtpId ? parsedDtpId : 0;

  if (dtpId > 0) {
    // TODO: Check dtp id presence and return { notFound: true } on failure
    return {
      props: {
        dtpId,
      },
    };
  }

  return {
    notFound: true,
  };
};

export default CommentsIframePage;
