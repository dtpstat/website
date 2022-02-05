import { buildCommentsApiUrl } from "../shared/api-helpers";
import {
  CommentsApiHandlerSuccessfulGetResponseBody,
  CommentsApiHandlerSuccessfulPostResponseBody,
  NewCommentPayload,
  PublicCommentInfo,
} from "../types";

export const fetchComments = async (
  baseUrl: string,
  accidentId: string,
): Promise<PublicCommentInfo[]> => {
  const commentsApiUrl = buildCommentsApiUrl(baseUrl, accidentId);
  const res = await fetch(commentsApiUrl);
  const { comments } =
    (await res.json()) as CommentsApiHandlerSuccessfulGetResponseBody;

  return comments;
};

export const postComment = async (
  baseUrl: string,
  newCommentPayload: NewCommentPayload,
): Promise<PublicCommentInfo> => {
  const res = await fetch(buildCommentsApiUrl(baseUrl), {
    body: JSON.stringify(newCommentPayload),
    method: "POST",
  });
  const { comment } =
    (await res.json()) as CommentsApiHandlerSuccessfulPostResponseBody;

  return comment;
};
