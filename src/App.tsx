import React from 'react';
import { Map } from './components/Map';
import { FilterPanel } from './components/FilterPanel';
import { InfoPanel } from './components/InfoPanel';
// import InfoBaloon from './components/InfoBaloon';
import { rootStore, RootStoreContext } from './models/RootStore';
// import Toast from 'components/Toast';
// import Layers from 'components/Layers';

export const App: React.FC = () => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            <Map />
            <div className="ui-layer">
                <FilterPanel />
                <InfoPanel />
                {/* <InfoBaloon /> */}
                {/* <Toast /> */}
                {/* <Layers /> */}
            </div>
        </RootStoreContext.Provider>
    );
};
