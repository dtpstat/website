import * as React from "react";

import { FilterPanel } from "./components/filter-panel-tmp";
import { InfoPanel } from "./components/info-panel";
import { Loader } from "./components/loader-tmp";
import { Map } from "./components/map-tmp";
import { rootStore, RootStoreContext } from "./models/root-store";
// import Toast from 'components/Toast';
// import Layers from './components/Layers/Layers';
// import Event from './components/Event/Event';
// import Modal from './components/Modal';
// import Articles from './components/News/Articles';
// import Article from './components/News/Article';

export const InheritedMap: React.VoidFunctionComponent = () => (
  <RootStoreContext.Provider value={rootStore}>
    <Loader />
    <Map />
    <div className="ui-layer">
      <FilterPanel />
      <InfoPanel />
      {/* <Toast /> */}
      {/* <Layers /> */}
    </div>
    {/* <Event /> */}
    {/* <Modal /> */}
    {/* <Article /> */}
    {/* <Articles /> */}
  </RootStoreContext.Provider>
);
