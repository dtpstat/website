export const apiEndPoints = {
  COMMENTS: "comments",
  USERS: "users",
};

export const buildApiUrl = (
  baseUrl: string,
  endpoint: string,
  id?: string,
): string => {
  const idPath = id ? `/${id}` : "";

  return `${baseUrl}/api/${endpoint}${idPath}`;
};

export const buildCommentsApiUrl = (baseUrl: string, accidentId: string) =>
  buildApiUrl(baseUrl, apiEndPoints.COMMENTS, accidentId);

export const buildUsersApiUrl = (baseUrl: string, userId?: string) =>
  buildApiUrl(baseUrl, apiEndPoints.USERS, userId);
