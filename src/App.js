import React from 'react';
import { Map } from './components/Map';
import { FilterPanel } from './components/FilterPanel';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { rootStore, RootStoreContext } from './models/RootStore';

function App() {
    return (
        <RootStoreContext.Provider value={rootStore}>
            <Map />
            <div className="ui-layer">
                <FilterPanel />
                <InfoPanel />
            </div>
        </RootStoreContext.Provider>
    );
}

export default App;
