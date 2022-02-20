export type AnyEmptyObject = Record<string, unknown>;

export const isEmpty = (obj: AnyEmptyObject) => Object.keys(obj).length === 0;

export const resultFromApiResult = (
  apiResult: AnyEmptyObject,
  keyFromApiKey: AnyEmptyObject,
) =>
  Object.fromEntries(
    Object.entries(apiResult).map(([apiKey, payload]) => [
      keyFromApiKey[apiKey],
      payload,
    ]),
  );
