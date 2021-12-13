import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import * as React from "react";

import { CommentList } from "../../../components/сomment-list";
import { commentsArePaused } from "../../../shared/helpersForComments";

export interface CommentsIframePageProps {
  dtpId?: number;
  comments?: unknown[]; // Comment[]
}

const CommentsIframePage: NextPage<CommentsIframePageProps> = ({
  dtpId,
  comments,
}) => {
  if (!dtpId || !comments) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <CommentList />
      <p>
        {commentsArePaused ? (
          "Добавление новых комментариев приостановлено"
        ) : (
          <button>добавить комментарий (пока не работает)</button>
        )}
      </p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  CommentsIframePageProps
> = async ({ params }) => {
  const rawDtpId = `${params?.dtpId}`;
  const parsedDtpId = parseInt(rawDtpId);
  const dtpId = `${parsedDtpId}` === rawDtpId ? parsedDtpId : 0;

  if (dtpId > 0) {
    // TODO: Check dtp id presence and return { notFound: true } on failure
    return {
      props: {
        dtpId,
        comments: [],
      },
    };
  }

  return {
    notFound: true,
  };
};

export default CommentsIframePage;
