import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import * as React from "react";

import { CommentInput } from "../../../components/comment-input";
import { CommentList } from "../../../components/comment-list";
import { CommentsProvider } from "../../../providers/comments-provider";
import { commentsArePaused } from "../../../shared/helpersForComments";

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
> = async ({ params }) => {
  const rawDtpId = params ? `${params["dtp-id"]}` : "";
  const parsedDtpId = parseInt(rawDtpId);
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