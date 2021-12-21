export const apiEndPoints = {
  COMMENTS: "comments",
  USERS: "users",
};

export const getApiUrl = (baseUrl: string, endpoint: string): string => {
  return `${baseUrl}/api/${endpoint}`;
};

export const getCommentsApiUrl = (baseUrl: string) =>
  getApiUrl(baseUrl, apiEndPoints.COMMENTS);

export const getUsersApiUrl = (baseUrl: string) =>
  getApiUrl(baseUrl, apiEndPoints.USERS);
