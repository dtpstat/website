import { getUsersApiUrl } from "../shared/api-helpers";
import { User } from "../types";

export const fetchUsers = async (baseUrl: string) => {
  const usersApiUrl = getUsersApiUrl(baseUrl);
  const res = await fetch(usersApiUrl);
  const { users } = await res.json();

  return users;
};

export const postUser = async (
  usersApiUrl: string,
  newUser: User,
): Promise<Comment> => {
  const res = await fetch(usersApiUrl, {
    body: JSON.stringify(newUser),
    method: "POST",
  });
  const { user } = await res.json();

  return user;
};

export const patchUser = async (
  usersApiUrl: string,
  updatedUser: User,
): Promise<Comment> => {
  const res = await fetch(usersApiUrl, {
    body: JSON.stringify(updatedUser),
    method: "PATCH",
  });
  const { user } = await res.json();

  return user;
};
