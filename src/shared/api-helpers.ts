export const apiEndPoints = {
  COMMENT: "comments",
};

export const apiUrl = (endpoint: string): string => {
  return `${process.env.AUTH0_BASE_URL}/api/${endpoint}`;
};

export const commentsApiUrl = apiUrl(apiEndPoints.COMMENT);
