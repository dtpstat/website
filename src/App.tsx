import React from 'react';
import { Map } from './components/Map';
import { FilterPanel } from './components/FilterPanel';
import { InfoPanel } from './components/InfoPanel';
import { rootStore, RootStoreContext } from './models/RootStore';

export const App: React.FC = () => {
    return (
        // @ts-ignore
        <RootStoreContext.Provider value={rootStore}>
            <Map />
            <div className="ui-layer">
                <FilterPanel />
                <InfoPanel />
            </div>
        </RootStoreContext.Provider>
    );
};
