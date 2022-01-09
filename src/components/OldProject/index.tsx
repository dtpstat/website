// import './Map.css'
import React from "react";

import { rootStore, RootStoreContext } from "../../models/RootStore";
import { FilterPanel } from "../FilterPanel";
import Map from "../OldMap";

const OldProject = () => (
  <>
    <RootStoreContext.Provider value={rootStore}>
      <Map />
      <FilterPanel />
    </RootStoreContext.Provider>
  </>
);

export default OldProject;
