import React from 'react'

import { Map } from './components/Map'
import { FilterPanel } from './components/FilterPanel'
import { InfoPanel } from './components/InfoPanel'
// import InfoBaloon from './components/InfoBaloon'
import { rootStore, RootStoreContext } from './models/RootStore'
//import Toast from 'components/Toast';
//import Layers from './components/Layers/Layers';
//import Event from './components/Event/Event';
//import Modal from './components/Modal';
//import Articles from './components/News/Articles';
//import Article from './components/News/Article';

export const App: React.FC = () => (
  <RootStoreContext.Provider value={rootStore}>
    <Map />
    <div className='ui-layer'>
      <FilterPanel />
      <InfoPanel />
      {/* <InfoBaloon /> */}
      {/* <Toast /> */}
      {/* <Layers /> */}
    </div>
    {/* <Event />*/}
    {/*<Modal />*/}
    {/*<Article />*/}
    {/*<Articles />*/}
  </RootStoreContext.Provider>
)
