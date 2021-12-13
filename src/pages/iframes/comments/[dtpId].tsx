import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import * as React from "react";
import styled from "styled-components";

import { CommentInput } from "../../../components/comment-input";
import { CommentList } from "../../../components/сomment-list";
import { commentsArePaused } from "../../../shared/helpersForComments";
import { Comment } from "../../../types";

export interface CommentsIframePageProps {
  dtpId?: number;
  comments?: Comment[];
}

const CommentsHeader = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 40px;
  color: #18334a;
`;

const CommentsIframePage: NextPage<CommentsIframePageProps> = ({
  dtpId,
  comments,
}) => {
  if (!dtpId || !comments) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <CommentsHeader>Комментарии - {comments.length}</CommentsHeader>
      <CommentList comments={comments} />
      <p>
        {commentsArePaused ? (
          "Добавление новых комментариев приостановлено"
        ) : (
          <CommentInput />
        )}
      </p>
    </div>
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
