import * as React from "react";

interface AccidentContextValue {
  accidentId: number;
  setAccidentId: React.Dispatch<React.SetStateAction<number>>;
}

const AccidentContext = React.createContext<AccidentContextValue | undefined>(
  undefined,
);

export const AccidentProvider: React.VoidFunctionComponent<{
  initAccidentId: number;
  children?: React.ReactNode;
}> = ({ initAccidentId, children }) => {
  const [accidentId, setAccidentId] = React.useState<number>(initAccidentId);

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
