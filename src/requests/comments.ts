import { buildCommentsApiUrl } from "../shared/api-helpers";
import { Comment, NewComment } from "../types";

export const fetchComments = async (
  baseUrl: string,
  accidentId: string,
): Promise<Comment[]> => {
  const commentsApiUrl = buildCommentsApiUrl(baseUrl, accidentId);
  const res = await fetch(commentsApiUrl);
  const { comments } = (await res.json()) as { comments: Comment[] };

  return comments;
};

export const postComment = async (
  baseUrl: string,
  newComment: NewComment,
): Promise<Comment> => {
  const res = await fetch(buildCommentsApiUrl(baseUrl, newComment.accidentId), {
    body: JSON.stringify(newComment),
    method: "POST",
  });
  const { comment } = (await res.json()) as { comment: Comment };

  return comment;
};
