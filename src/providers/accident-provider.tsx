import * as React from "react";

interface AccidentContextValue {
  accidentId: string;
  setAccidentId: React.Dispatch<React.SetStateAction<string>>;
}

const AccidentContext = React.createContext<AccidentContextValue | undefined>(
  undefined,
);

export const AccidentProvider: React.VoidFunctionComponent<{
  initAccidentId: string;
  children?: React.ReactNode;
}> = ({ initAccidentId, children }) => {
  const [accidentId, setAccidentId] = React.useState<string>(initAccidentId);

  const providerValue = React.useMemo<AccidentContextValue>(
    () => ({ accidentId, setAccidentId }),
    [accidentId, setAccidentId],
  );

  return (
    <AccidentContext.Provider value={providerValue}>
      {children}
    </AccidentContext.Provider>
  );
};

export const useAccident = (): AccidentContextValue => {
  const result = React.useContext(AccidentContext);
  if (result === undefined) {
    throw new Error("No AccidentContext value available");
  }

  return result;
};
