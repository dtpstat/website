export interface Comment {
  id?: number;
  text?: string;
  auth0userSub?: string;
  user?: User;
  createDate?: string;
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
  auth0userSub?: string;
  avatarUrl?: string;
}
