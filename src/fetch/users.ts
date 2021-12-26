import { buildUsersApiUrl } from "../shared/api-helpers";
import { User } from "../types";

export const fetchUsers = async (baseUrl: string) => {
  const usersApiUrl = buildUsersApiUrl(baseUrl);
  const res = await fetch(usersApiUrl);
  const { users } = await res.json();

  return users;
};

export const postUser = async (
  baseUrl: string,
  newUser: User,
): Promise<User> => {
  const usersApiUrl = buildUsersApiUrl(baseUrl);
  const res = await fetch(usersApiUrl, {
    body: JSON.stringify(newUser),
    method: "POST",
  });
  const { user } = await res.json();

  return user;
};

export const patchUser = async (
  baseUrl: string,
  updatedUser: User,
): Promise<User> => {
  const usersApiUrl = buildUsersApiUrl(baseUrl);
  const res = await fetch(usersApiUrl, {
    body: JSON.stringify(updatedUser),
    method: "PATCH",
  });
  const { user } = await res.json();

  return user;
};
