import React from 'react';
import { types } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';
import { AreaModel } from './AreaModel';

const RootModel = types.model('RootModel', {
    area: AreaModel,
});

export const rootStore = RootModel.create({
    area: {}
});

makeInspectable(rootStore)

export const RootStoreContext = React.createContext(null);

export function useStore() {
    const store = React.useContext(RootStoreContext);
    return store;
}
