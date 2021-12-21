import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import * as React from "react";

import { CommentInput } from "../../../components/comment-input";
import { CommentList } from "../../../components/comment-list";
import { fetchComments } from "../../../fetch/comments";
import { CommentsProvider } from "../../../providers/comments-provider";
import { commentsArePaused } from "../../../shared/helpersForComments";
import { Comment } from "../../../types";

export interface CommentsIframePageProps {
  dtpId?: number;
  comments?: Comment[];
  baseUrl: any;
}

const CommentsIframePage: NextPage<CommentsIframePageProps> = ({
  dtpId,
  comments,
  baseUrl,
}) => {
  if (!dtpId || !comments) {
    return <Error statusCode={404} />;
  }

  return (
    <CommentsProvider initComments={comments} initBaseUrl={baseUrl}>
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
  const rawDtpId = `${params?.dtpId}`;
  const parsedDtpId = parseInt(rawDtpId);
  const dtpId = `${parsedDtpId}` === rawDtpId ? parsedDtpId : 0;

  const baseUrl = global.process.env.AUTH0_BASE_URL as string;
  const comments = await fetchComments(baseUrl);

  if (dtpId > 0) {
    // TODO: Check dtp id presence and return { notFound: true } on failure
    return {
      props: {
        dtpId,
        comments,
        baseUrl,
      },
    };
  }

  return {
    notFound: true,
  };
};

export default CommentsIframePage;
