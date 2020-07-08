import * as React from 'react';
import { Header } from './components/Header';
import { Map } from './components/Map';
import { FilterPanel } from './components/FilterPanel';
import { InfoPanel } from './components/InfoPanel/InfoPanel';

function App() {
    return (
        <>
            <Map />
            <div className="ui-layer">
                <FilterPanel />
                <InfoPanel />
            </div>
        </>
    );
}

export default App;
