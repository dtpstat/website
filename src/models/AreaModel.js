import { types, flow } from 'mobx-state-tree';
import { fetchArea, fetchFilters, fetchStatistics } from 'network';
import { FilterModel, DateFilterModel } from './FilterModel';

function createAreaModelFromServerResponse(response) {
    return {
        id: response?.region_slug,
        name: response?.region_name,
        parentName: response?.parent_region_name,
    };
}

function createFilterModelFromServerResponse(response) {
    return response.map(({ id, name, label, multiple, default_value }) => ({
        id,
        name,
        label,
        multiple,
        defaultValue: default_value
            ? {
                  startDate: default_value.start_date,
                  endDate: default_value.end_date,
              }
            : undefined,
    }));
}

export const AreaModel = types
    .model('AreaModel', {
        id: types.maybeNull(types.string),
        name: types.maybeNull(types.string),
        parentName: types.maybeNull(types.string),
        count: types.maybeNull(types.number),
        injured: types.maybeNull(types.number),
        dead: types.maybeNull(types.number),
        filters: types.array(types.union(FilterModel, DateFilterModel)),
    })
    .actions((self) => ({
        init({ id, name, parentName }) {
            self.id = id;
            self.name = name;
            self.parentName = parentName;
        },
        clear() {
            self.id = null;
            self.name = null;
            self.parentName = null;
            self.filters = [];
        },
        fetchArea: flow(function* (center, scale) {
            const response = yield fetchArea(center, scale);
            if (!response || !response.region_slug) {
                self.clear();
                return;
            }
            self.init(createAreaModelFromServerResponse(response));
            yield self.fetchFilters();
            yield self.fetchStatistics(center, scale);
        }),
        fetchFilters: flow(function* () {
            const response = yield fetchFilters(self.id);
            self.filters = createFilterModelFromServerResponse(response);
        }),
        fetchStatistics: flow(function* (center, scale) {
            const dateFilter = self.filters.filter(
                (filter) => filter.name === 'date',
            );
            if (dateFilter.length === 0) {
                return;
            }
            const { startDate, endDate } = dateFilter[0].defaultValue;
            const response = yield fetchStatistics(
                center,
                scale,
                startDate,
                endDate,
            );
            console.log(response);
        }),
    }));
