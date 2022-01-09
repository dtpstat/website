// import './Map.css'
import React from "react";

import { rootStore, RootStoreContext } from "../../models/RootStore";
import Map from "../OldMap";

const OldProject = () => (
  <>
    <RootStoreContext.Provider value={rootStore}>
      <Map />
    </RootStoreContext.Provider>
  </>
);

export default OldProject;
