import { types, flow, Instance, cast, getParent } from 'mobx-state-tree';
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
import { containsBounds } from 'geo';

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
        bounds: types.array(types.array(types.number)),
    })
    .actions((self) => {
        function init({
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
        }

        function clear() {
            self.id = null;
            self.name = null;
            self.parentName = null;
            self.filters = cast([]);
            self.dead = null;
            self.injured = null;
            self.count = null;
        }
        const fetchAreaAction = flow(function* (center, scale, bounds) {
            window.history.pushState(
                null,
                '',
                `?center=${center[0]}:${center[1]}&scale=${scale}`,
            );
            const response = yield fetchArea(center, scale);
            if (!response || !response.region_slug) {
                clear();
                return;
            }
            const area = createAreaModelFromServerResponse(response);
            if (self.id === area.id) {
                yield fetchDtpAction(bounds);
                return;
            }

            init(area);
            yield fetchFiltersAction();
            yield fetchStatisticsAction(center, scale);
            yield fetchDtpAction(bounds);
            self.bounds = bounds;
        });
        const fetchFiltersAction = flow(function* () {
            const response = yield fetchFilters(self.id!);
            self.filters = cast(createFilterModelFromServerResponse(response));
        });
        const fetchStatisticsAction = flow(function* (center, scale) {
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
        });
        // @ts-ignore
        const fetchDtpAction = flow(function* (bounds: Bounds) {
            const dateFilters = self.filters.filter(
                (filter) => filter.name === 'date',
            );
            if (dateFilters.length === 0) {
                return;
            }
            const dateFilter = dateFilters[0] as IDateFilterModel;
            const { startDate, endDate } = dateFilter.defaultValue;
            if (
                self.bounds.length !== 0 &&
                containsBounds(self.bounds, bounds)
            ) {
                return;
            }
            const response = yield fetchDtp(startDate, endDate, bounds);
            self.dtp = response;
            // @ts-ignore
            getParent(self).mapStore.drawObjects(self.dtp);
        });
        return {
            init,
            clear,
            fetchAreaAction,
            fetchFiltersAction,
            fetchStatisticsAction,
            fetchDtpAction,
        };
    });
