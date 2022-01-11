import { observer } from "mobx-react";
import { useStore } from "models/RootStore";
import React from "react";

export const Loader = observer(() => {
  const rootStore = useStore();

  return (
    <div className={rootStore.loadingCount > 0 ? "loader visible" : "loader"} />
  );
});
