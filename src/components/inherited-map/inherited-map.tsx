/* eslint-disable spaced-comment */
import * as React from "react";

import { FilterPanel } from "./components/filter-panel";
import { InfoPanel } from "./components/info-panel";
import { Loader } from "./components/loader";
import { Map } from "./components/map";
import { rootStore, RootStoreContext } from "./models/root-store";
//import Toast from 'components/Toast';
//import Layers from './components/Layers/Layers';
//import Event from './components/Event/Event';
//import Modal from './components/Modal';
//import Articles from './components/News/Articles';
//import Article from './components/News/Article';

const InheritedMap: React.VoidFunctionComponent = () => (
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

const MemoizedInheritedMap = React.memo(InheritedMap);
export { MemoizedInheritedMap as InheritedMap };
