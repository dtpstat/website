// import './Map.css'
import React from "react";

import { rootStore, RootStoreContext } from "../../models/RootStore";
import { FilterPanel } from "../FilterPanel";
import { InfoPanel } from "../InfoPanel";
import { App } from "../inherited/dtp-map/src/App";
import { Loader } from "../Loader";
import Map from "../OldMap";
import { UiLayer } from "./styles";

const OldProject = () => (
  <>
    <App />
  </>
);
// const OldProject = () => (
//   <>
//     <RootStoreContext.Provider value={rootStore}>
//       <Loader />
//       <Map />
//       <UiLayer>
//         <FilterPanel />
//         <InfoPanel />
//       </UiLayer>
//     </RootStoreContext.Provider>
//   </>
// );

export default OldProject;
