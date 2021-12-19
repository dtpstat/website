import React from "react";

interface ApiContextValue {
  baseUrl: string;
  setBaseUrl: React.Dispatch<React.SetStateAction<string>>;
}

const ApiContext = React.createContext<ApiContextValue | undefined>(undefined);

export const ApiProvider: React.FunctionComponent = ({ children }) => {
  const [baseUrl, setBaseUrl] = React.useState<string>("");

  const providerValue = React.useMemo<ApiContextValue>(
    () => ({
      baseUrl,
      setBaseUrl,
    }),
    [baseUrl, setBaseUrl],
  );

  return (
    <ApiContext.Provider value={providerValue}>{children}</ApiContext.Provider>
  );
};

export const useApi = (): ApiContextValue => {
  const result = React.useContext(ApiContext);
  if (result === undefined) {
    throw new Error("No ApiContext value available");
  }

  return result;
};
