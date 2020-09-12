import { types, Instance, flow } from 'mobx-state-tree';
import { fetchFilters } from 'network';
import { FilterResponse } from 'types';

const DateDefaultValueModel = types.model('DateDefaultValueModel', {
    startDate: types.string,
    endDate: types.string,
});

export const DateFilterModel = types.model('DateFilterModel', {
    label: types.string,
    name: types.string,
    defaultValue: DateDefaultValueModel,
    values: types.array(types.string),
});

const SeverityItemModel = types.model('SeverityItemModel', {
    preview: types.string,
    value: types.number,
    color: types.string,
    disabled: types.boolean,
    default: types.boolean,
});

export const SeverityFilterModel = types.model('SeverityFilterModel', {
    label: types.string,
    multiple: types.boolean,
    name: types.string,
    values: types.array(SeverityItemModel),
});

const ParticipantItemModel = types.model({
    preview: types.string,
    value: types.string,
    icon: types.string,
    default: types.boolean,
});

export const ParticipantsFilterModel = types.model('ParticipantsFilterModel', {
    label: types.string,
    multiple: types.boolean,
    name: types.string,
    values: types.array(ParticipantItemModel),
});

const CategoryItemModel = types.model('CategoryItemModel', {
    preview: types.string,
    value: types.number,
});

export const CategoryFilterModel = types.model('CategoryFilterModel', {
    name: types.string,
    label: types.string,
    multiple: types.boolean,
    values: types.array(CategoryItemModel),
});

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

export const FilterModel = types
    .model('FilterModel', {
        selectedFilterId: types.maybeNull(types.string),
        filters: types.map(
            types.array(
                types.union(
                    ParticipantsFilterModel,
                    DateFilterModel,
                    SeverityFilterModel,
                    CategoryFilterModel,
                ),
            ),
        ),
    })
    .views((self) => {
        return {
            get selectedFilter() {
                if (!self.selectedFilterId) {
                    return null;
                }
                return self.filters.get(self.selectedFilterId);
            },
        };
    })
    .actions((self) => {
        const addFilter = (area: string, filters: IFilter[]) => {
            self.filters.set(area, filters);
        };

        const selectFilter = flow(function* (area: string) {
            const response = yield fetchFilters(area);
            self.filters.set(
                area,
                createFilterModelFromServerResponse(response),
            );
        });

        return {
            addFilter,
            selectFilter,
        };
    });

export interface IParticipantsFilterModel
    extends Instance<typeof ParticipantsFilterModel> {}
export interface ISeverityFilterModel
    extends Instance<typeof SeverityFilterModel> {}
export interface IDateFilterModel extends Instance<typeof DateFilterModel> {}
export interface ICategoryFilterModel
    extends Instance<typeof CategoryFilterModel> {}

export type IFilter =
    | IParticipantsFilterModel
    | ISeverityFilterModel
    | IDateFilterModel
    | ICategoryFilterModel;
