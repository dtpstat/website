export interface Comment {
  id: number;
  text: string;
  user: User;
  createDate: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}
