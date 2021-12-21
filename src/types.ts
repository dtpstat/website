export interface Comment {
  id?: number;
  text?: string;
  authorId?: string;
  author?: User;
  createDate?: string;
  isPublished?: boolean;
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
  auth0userSub?: string;
  avatarUrl?: string;
}
