import React from 'react';
import { types } from 'mobx-state-tree';
// @ts-ignore
import makeInspectable from 'mobx-devtools-mst';
import { AreaModel } from './AreaModel';
import { FilterModel } from './FilterModel';
import { MapStore } from './MapStore';

const RootModel = types.model('RootModel', {
    area: AreaModel,
    filters: FilterModel,
    mapStore: MapStore,
});

export const rootStore = RootModel.create({
    area: {},
    filters: {},
    mapStore: {},
});

makeInspectable(rootStore);

export const RootStoreContext = React.createContext<typeof rootStore>(
    rootStore,
);

export function useStore() {
    const store = React.useContext(RootStoreContext);
    return store;
}
