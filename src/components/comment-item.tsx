import * as React from "react";

// import styled from "styled-components";
// import { formatDate } from "../shared/date-helpers";
import { Comment } from "../types";
// import { AvatarImage } from "./avatar-image";

export interface CommentItemProps {
  comment: Comment;
}

// const CommentText = styled.div`
//   font-family: Roboto;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 24px;
//   letter-spacing: 0em;
//   text-align: left;
//   color: #18334a;
//   margin: 4px 0 16px;
//   display: block;
// `;

// const CommentAuthor = styled(CommentText)`
//   font-weight: 500;
//   line-height: 28px;
//   letter-spacing: 0.15px;
//   color: #18334a;
//   display: inline;
// `;

// const CommentDate = styled(CommentText)`
//   font-size: 14px;
//   line-height: 20px;
//   letter-spacing: 0.15px;
//   color: rgba(24, 51, 74, 0.5);
//   display: inline;
// `;

// const CommentContainer = styled.div`
//   display: flex;
// `;

export const CommentItem: React.VoidFunctionComponent<CommentItemProps> = ({
  comment,
}) => {
  return (
    <div>hello {comment.id}</div>
    // <CommentContainer>
    //   <AvatarImage src={comment.avatarUrl} />
    //   <div>
    //     <div>
    //       <CommentAuthor>{comment.user}</CommentAuthor>:{" "}
    //       <CommentDate>{formatDate(comment.date)}</CommentDate>
    //     </div>
    //     <CommentText>{comment.text}</CommentText>
    //   </div>
    // </CommentContainer>
  );
};
