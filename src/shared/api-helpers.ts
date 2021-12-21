export const apiEndPoints = {
  COMMENTS: "comments",
  USERS: "users",
};

export const buildApiUrl = (baseUrl: string, endpoint: string): string => {
  return `${baseUrl}/api/${endpoint}`;
};

export const buildCommentsApiUrl = (baseUrl: string) =>
  buildApiUrl(baseUrl, apiEndPoints.COMMENTS);

export const buildUsersApiUrl = (baseUrl: string) =>
  buildApiUrl(baseUrl, apiEndPoints.USERS);
