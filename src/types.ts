import { type CommentStatus } from "@prisma/client";

export interface NewComment {
  text: string;
  accidentId: string;
}

export interface PublicCommentInfo {
  accidentId: string;
  authorAvatarUrl?: string;
  authorName: string;
  createdAt: string;
  id: number;
  status: CommentStatus;
  text: string;
}

export interface CommentsApiHandlerSuccessfulGetResponseBody {
  status: "ok";
  comments: PublicCommentInfo[];
}

export interface CommentsApiHandlerSuccessfulPostResponseBody {
  status: "ok";
  comment: PublicCommentInfo;
}
