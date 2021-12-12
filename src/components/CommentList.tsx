import * as React from "react";
import styled from "styled-components";

import { Comment } from "../types";
import { CommentItem } from "./CommentItem";

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

const CommentsHeader = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 40px;
  color: #18334a;
`;

export const CommentList: React.VoidFunctionComponent = () => {
  return (
    <div>
      <CommentsHeader>Комментарии - {comments.length}</CommentsHeader>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};
