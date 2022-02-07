import {
  CommentsApiHandlerSuccessfulGetResponseBody,
  CommentsApiHandlerSuccessfulPostResponseBody,
  NewComment,
  PublicCommentInfo,
} from "../types";

export const fetchComments = async (
  accidentId: string,
): Promise<PublicCommentInfo[]> => {
  const res = await fetch(
    `/api/comments?accident-id=${encodeURIComponent(accidentId)}`,
  );

  const { comments } =
    (await res.json()) as CommentsApiHandlerSuccessfulGetResponseBody;

  return comments;
};

export const postComment = async (
  newComment: NewComment,
): Promise<PublicCommentInfo> => {
  const res = await fetch("/api/comments/post", {
    body: JSON.stringify(newComment),
    method: "POST",
  });

  const { comment } =
    (await res.json()) as CommentsApiHandlerSuccessfulPostResponseBody;

  return comment;
};
