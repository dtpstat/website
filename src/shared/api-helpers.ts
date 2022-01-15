export const apiEndPoints = {
  COMMENTS: "comments",
  USERS: "users",
};

export const buildApiUrl = (
  baseUrl: string,
  endpoint: string,
  id?: string | number,
): string => {
  const idPath = id ? `/${id}` : "";

  return `${baseUrl}/api/${endpoint}${idPath}`;
};

export const buildCommentsApiUrl = (baseUrl: string, accidentId: number) =>
  buildApiUrl(baseUrl, apiEndPoints.COMMENTS, accidentId);

export const buildUsersApiUrl = (baseUrl: string, userId?: string) =>
  buildApiUrl(baseUrl, apiEndPoints.USERS, userId);

export const getApiParamNumberValue = (paramValue?: string) => {
  const stringValue = typeof paramValue === "string" ? paramValue : "";
  const numberValue = Number.parseInt(stringValue);
  const resultValue = `${numberValue}` === stringValue ? numberValue : 0;

  return resultValue;
};
