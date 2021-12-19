export const apiEndPoints = {
  COMMENTS: "comments",
};

export const getApiUrl = (baseUrl: string, endpoint: string): string => {
  return `${baseUrl}/api/${endpoint}`;
};

export const getCommentsApiUrl = (baseUrl: string) =>
  getApiUrl(baseUrl, apiEndPoints.COMMENTS);
