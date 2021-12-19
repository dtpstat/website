import { getCommentsApiUrl } from "../shared/api-helpers";
import { Comment } from "../types";

export const fetchComments = async (baseUrl: string) => {
  const commentsApiUrl = getCommentsApiUrl(baseUrl);
  const res = await fetch(commentsApiUrl);
  const { comments } = await res.json();

  return comments;
};

export const postComment = async (
  commentsApiUrl: string,
  newComment: Comment,
): Promise<Comment> => {
  const res = await fetch(commentsApiUrl, {
    body: JSON.stringify(newComment),
    method: "POST",
  });
  const { comment } = await res.json();

  return comment;
};
