import { buildUsersApiUrl } from "../shared/api-helpers";
import { User } from "../types";

export const fetchUser = async (
  baseUrl: string,
  userId: string,
): Promise<User | undefined> => {
  const userApiUrl = buildUsersApiUrl(baseUrl, userId);
  const res = await fetch(userApiUrl);
  const { user } = (await res.json()) as { user: User | null };

  return user ?? undefined;
};

export const fetchUsers = async (baseUrl: string): Promise<User[]> => {
  const usersApiUrl = buildUsersApiUrl(baseUrl);
  const res = await fetch(usersApiUrl);
  const { users } = (await res.json()) as { users: User[] };

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
  const { user } = (await res.json()) as { user: User };

  return user;
};

export const patchUser = async (
  baseUrl: string,
  userId: string,
  updatedUser: User,
): Promise<User> => {
  const userApiUrl = buildUsersApiUrl(baseUrl, userId);
  const res = await fetch(userApiUrl, {
    body: JSON.stringify(updatedUser),
    method: "PATCH",
  });
  const { user } = (await res.json()) as { user: User };

  return user;
};
