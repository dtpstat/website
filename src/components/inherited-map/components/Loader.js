import { observer } from "mobx-react";
import * as React from "react";

import { useStore } from "../models-x/RootStore";

export const Loader = observer(() => {
  const rootStore = useStore();

  return (
    <div className={rootStore.loadingCount > 0 ? "loader visible" : "loader"} />
  );
});
