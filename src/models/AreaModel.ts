import { types, flow, Instance, cast } from 'mobx-state-tree';
import { fetchArea, fetchFilters, fetchStatistics, fetchDtp } from 'network';
import {
    ParticipantsFilterModel,
    DateFilterModel,
    SeverityFilterModel,
    CategoryFilterModel,
    IDateFilterModel,
    IParticipantsFilterModel,
    ISeverityFilterModel,
    ICategoryFilterModel,
} from './FilterModel';
import { DtpModel } from './DtpModel';
import { ShortStatisticsResponse, Bounds, FilterResponse } from 'types';

function createAreaModelFromServerResponse(response: ShortStatisticsResponse) {
    return {
        id: response?.region_slug,
        name: response?.region_name,
        parentName: response?.parent_region_name,
    };
}

function createFilterModelFromServerResponse(response: FilterResponse[]) {
    // eslint-disable-next-line array-callback-return
    return response.map((filter) => {
        const { name, label, values } = filter;
        switch (filter.name) {
            case 'date':
                return {
                    name,
                    label,
                    values,
                    defaultValue: {
                        startDate: filter.default_value.start_date,
                        endDate: filter.default_value.end_date,
                    },
                } as IDateFilterModel;
            case 'participant_categories':
            case 'severity':
            case 'category':
                return {
                    name,
                    label,
                    values,
                    multiple: filter.multiple,
                } as
                    | IParticipantsFilterModel
                    | ISeverityFilterModel
                    | ICategoryFilterModel;
        }
    });
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
        init({
            id,
            name,
            parentName,
        }: {
            id: string;
            name: string;
            parentName: string;
        }) {
            self.id = id;
            self.name = name;
            self.parentName = parentName;
            self.filters = cast([]);
            self.dead = null;
            self.injured = null;
            self.count = null;
        },
        clear() {
            self.id = null;
            self.name = null;
            self.parentName = null;
            self.filters = cast([]);
            self.dead = null;
            self.injured = null;
            self.count = null;
        },
        fetchArea: flow(function* (center, scale, bounds) {
            const response = yield fetchArea(center, scale);
            if (!response || !response.region_slug) {
                // @ts-ignore
                self.clear();
                return;
            }
            const area = createAreaModelFromServerResponse(response);
            if (self.id === area.id) {
                // @ts-ignore
                yield self.fetchDtp(bounds);
                return;
            }
            // @ts-ignore
            self.init(area);
            // @ts-ignore
            yield self.fetchFilters();
            // @ts-ignore
            yield self.fetchStatistics(center, scale);
            // @ts-ignore
            yield self.fetchDtp(bounds);
        }),
        fetchFilters: flow(function* () {
            const response = yield fetchFilters(self.id!);
            self.filters = cast(createFilterModelFromServerResponse(response));
        }),
        fetchStatistics: flow(function* (center, scale) {
            const dateFilters = self.filters.filter(
                (filter) => filter.name === 'date',
            );
            if (dateFilters.length === 0) {
                return;
            }
            const dateFilter = dateFilters[0] as Instance<
                typeof DateFilterModel
            >;
            const { startDate, endDate } = dateFilter.defaultValue;
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
        // @ts-ignore
        fetchDtp: flow(function* (bounds: Bounds) {
            const dateFilters = self.filters.filter(
                (filter) => filter.name === 'date',
            );
            if (dateFilters.length === 0) {
                return;
            }
            const dateFilter = dateFilters[0] as IDateFilterModel;
            const { startDate, endDate } = dateFilter.defaultValue;
            const response = yield fetchDtp(startDate, endDate, bounds);
            self.dtp = response;
        }),
    }));
