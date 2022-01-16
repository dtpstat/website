import * as React from "react";
import styled from "styled-components";

import { formatDate } from "../shared/date-helpers";
import { Comment } from "../types";
import { AvatarImage } from "./avatar-image";

export interface CommentItemProps {
  comment: Comment;
}

const CommentText = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #18334a;
  margin: 4px 0 16px;
  display: block;
`;

const CommentAuthor = styled(CommentText)`
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0.15px;
  color: #18334a;
  display: inline;
`;

const CommentDate = styled(CommentText)`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.15px;
  color: rgba(24, 51, 74, 0.5);
  display: inline;
`;

const CommentContainer = styled.div`
  display: flex;
`;

const Tag = styled.span`
  border-radius: 10px;
  background: orange;
  color: white;
  font-size: 12px;
  margin: 0 6px;
  padding: 6px 10px;
  cursor: pointer;
`;

export const CommentItem: React.VoidFunctionComponent<CommentItemProps> = ({
  comment,
}) => {
  return (
    <CommentContainer>
      <AvatarImage email={comment.author?.email} />
      <div>
        <div>
          <CommentAuthor>{comment.author?.name}</CommentAuthor>:{" "}
          <CommentDate>{formatDate(comment.createDate)}</CommentDate>
          {comment.isPublished ? undefined : (
            <Tag title="Комментарий еще не опубликован и виден только вам">
              На модерации
            </Tag>
          )}
        </div>
        <CommentText>{comment.text}</CommentText>
      </div>
    </CommentContainer>
  );
};
