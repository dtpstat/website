import { types, flow } from 'mobx-state-tree';
import { fetchArea, fetchFilters, fetchStatistics, fetchDtp } from 'network';
import {
    ParticipantsFilterModel,
    DateFilterModel,
    SeverityFilterModel,
    CategoryFilterModel,
} from './FilterModel';
import { DtpModel } from './DtpModel';

function createAreaModelFromServerResponse(response) {
    return {
        id: response?.region_slug,
        name: response?.region_name,
        parentName: response?.parent_region_name,
    };
}

function createFilterModelFromServerResponse(response) {
    return response.map(
        ({ id, name, label, multiple, default_value, values }) => ({
            id,
            name,
            label,
            multiple,
            values,
            defaultValue: default_value
                ? {
                      startDate: default_value.start_date,
                      endDate: default_value.end_date,
                  }
                : undefined,
        }),
    );
}

export const AreaModel = types
    .model('AreaModel', {
        id: types.maybeNull(types.string),
        name: types.maybeNull(types.string),
        parentName: types.maybeNull(types.string),
        count: types.maybeNull(types.number),
        injured: types.maybeNull(types.number),
        dead: types.maybeNull(types.number),
        filters: types.array(
            types.union(
                ParticipantsFilterModel,
                DateFilterModel,
                SeverityFilterModel,
                CategoryFilterModel,
            ),
        ),
        dtp: types.array(DtpModel),
    })
    .actions((self) => ({
        init({ id, name, parentName }) {
            self.id = id;
            self.name = name;
            self.parentName = parentName;
            self.filters = [];
            self.dead = null;
            self.injured = null;
            self.count = null;
        },
        clear() {
            self.id = null;
            self.name = null;
            self.parentName = null;
            self.filters = [];
            self.dead = null;
            self.injured = null;
            self.count = null;
        },
        fetchArea: flow(function* (center, scale, bounds) {
            const response = yield fetchArea(center, scale);
            if (!response || !response.region_slug) {
                self.clear();
                return;
            }
            const area = createAreaModelFromServerResponse(response);
            if (self.id === area.id) {
                return;
            }
            self.init(area);
            yield self.fetchFilters();
            yield self.fetchStatistics(center, scale);
            yield self.fetchDtp(bounds);
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
            self.dead = response?.dead;
            self.injured = response?.injured;
            self.count = response?.count;
        }),
        fetchDtp: flow(function* (bounds) {
            const dateFilter = self.filters.filter(
                (filter) => filter.name === 'date',
            );
            if (dateFilter.length === 0) {
                return;
            }
            const { startDate, endDate } = dateFilter[0].defaultValue;
            const response = yield fetchDtp(startDate, endDate, bounds);
            self.dtp = response;
        }),
    }));
