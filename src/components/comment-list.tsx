import * as React from "react";
import styled from "styled-components";

import { useComments } from "../providers/comments-provider";
import { CommentItem } from "./comment-item";
import { Loader } from "./loader";

const CommentsHeader = styled.h2`
  font-family: ${(props) => props.theme.fontFamily};
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 40px;
  color: #18334a;
`;

const StyledLoader = styled(Loader)`
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.5em;
`;

export const CommentList: React.VoidFunctionComponent = () => {
  const { comments, commentsAreLoading } = useComments();

  return (
    <div>
      <CommentsHeader>
        Комментарии
        {commentsAreLoading ? <StyledLoader /> : <> – {comments.length}</>}
      </CommentsHeader>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};
