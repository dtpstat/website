import { buildCommentsApiUrl } from "../shared/api-helpers";
import { Comment, NewComment } from "../types";

export const fetchComments = async (baseUrl: string): Promise<Comment[]> => {
  const commentsApiUrl = buildCommentsApiUrl(baseUrl);
  const res = await fetch(commentsApiUrl);
  const { comments } = (await res.json()) as { comments: Comment[] };

  return comments;
};

export const postComment = async (
  baseUrl: string,
  newComment: NewComment,
): Promise<Comment> => {
  const res = await fetch(buildCommentsApiUrl(baseUrl), {
    body: JSON.stringify(newComment),
    method: "POST",
  });
  const { comment } = (await res.json()) as { comment: Comment };

  return comment;
};
