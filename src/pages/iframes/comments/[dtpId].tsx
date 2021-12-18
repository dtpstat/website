import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import * as React from "react";

import { CommentInput } from "../../../components/comment-input";
import { CommentList } from "../../../components/comment-list";
import { CommentsProvider } from "../../../providers/comments-provider";
import { getComments } from "../../../providers/prisma-provider";
import { commentsArePaused } from "../../../shared/helpersForComments";
import { Comment } from "../../../types";

export interface CommentsIframePageProps {
  dtpId?: number;
  comments?: Comment[];
}

const CommentsIframePage: NextPage<CommentsIframePageProps> = ({
  dtpId,
  comments,
}) => {
  if (!dtpId || !comments) {
    return <Error statusCode={404} />;
  }

  return (
    <CommentsProvider initComments={comments}>
      <CommentList />

      {commentsArePaused ? (
        <p>Добавление новых комментариев приостановлено</p>
      ) : (
        <CommentInput />
      )}
    </CommentsProvider>
  );
};

const comments: Comment[] = [
  {
    id: 1,
    text: "информация о верификации данных, если координаты изменены при обработке (координаты отличаются от заявленных ГИБДД, но прошли подтверждение модератором).",
    user: "Павел Кучерягин",
    date: new Date().toUTCString(),
    avatarUrl:
      "https://robohash.org/6ae852fa3a8b1c79dba3f7dc883c1760?set=set4&bgset=&size=200x200",
  },
  {
    id: 2,
    text: "Оставленная пользователями дополнительная/уточняющая информация",
    user: "Anna Kravtz",
    date: new Date().toUTCString(),
  },
];

export const getServerSideProps: GetServerSideProps<
  CommentsIframePageProps
> = async ({ params }) => {
  const rawDtpId = `${params?.dtpId}`;
  const parsedDtpId = parseInt(rawDtpId);
  const dtpId = `${parsedDtpId}` === rawDtpId ? parsedDtpId : 0;

  await getComments();

  if (dtpId > 0) {
    // TODO: Check dtp id presence and return { notFound: true } on failure
    return {
      props: {
        dtpId,
        comments, // TODO: Replace sample with fetched data
      },
    };
  }

  return {
    notFound: true,
  };
};

export default CommentsIframePage;
