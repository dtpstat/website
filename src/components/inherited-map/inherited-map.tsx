/* eslint-disable spaced-comment */
import * as React from "react";

import { FilterPanel } from "./components/filter-panel";
import { InfoPanel } from "./components/info-panel";
import { Layers } from "./components/layers/layers";
import { Loader } from "./components/loader";
import { Map } from "./components/map";
import { rootStore, RootStoreContext } from "./models/root-store";
// import { Toast } from "./components/toast";
// import { Event } from './components/event/event';
//import { Modal } from './components/modal';
//import { Articles } from './components/news/articles';
//import { Article } from './components/news/article';

export const InheritedMap: React.VoidFunctionComponent = () => (
  <RootStoreContext.Provider value={rootStore}>
    <Loader />
    <Map />
    <div className="ui-layer">
      <FilterPanel />
      <InfoPanel />
      <Layers />
      {/* <Toast /> */}
    </div>
    {/* <Event /> */}
    {/* <Modal /> */}
    {/* <Article /> */}
    {/* <Articles /> */}
  </RootStoreContext.Provider>
);
