import * as React from 'react';
import { Map } from './components/Map';
import { FilterPanel } from './components/FilterPanel';
import { InfoPanel } from './components/InfoPanel/InfoPanel';

function App() {
    const [area, setArea] = React.useState(null);

    return (
        <>
            <Map onChangeArea={setArea} />
            <div className="ui-layer">
                <FilterPanel />
                <InfoPanel area={area} />
            </div>
        </>
    );
}

export default App;
