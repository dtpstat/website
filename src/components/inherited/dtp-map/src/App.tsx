import React from "react";

import { FilterPanel } from "./components/FilterPanel";
import { InfoPanel } from "./components/InfoPanel";
import { Loader } from "./components/Loader";
import { Map } from "./components/Map";
import { rootStore, RootStoreContext } from "./models/RootStore";
// import Toast from 'components/Toast';
// import Layers from './components/Layers/Layers';
// import Event from './components/Event/Event';
// import Modal from './components/Modal';
// import Articles from './components/News/Articles';
// import Article from './components/News/Article';

const App: React.FC = () => (
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

export default App;
