export interface NewCommentPayload {
  text: string;
  accidentId: string;
}

export interface PublicCommentInfo {
  accidentId: string;
  authorAvatarUrl?: string;
  authorName: string;
  createdAt: string;
  id: number;
  isPublished: boolean;
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
