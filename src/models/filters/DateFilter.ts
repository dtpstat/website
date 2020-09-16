import { Instance, types } from 'mobx-state-tree';

const DateValue = types.model('DateValue', {
    start_date: types.string,
    end_date: types.string,
});

export const DateFilter = types.model('DateFilter', {
    label: types.string,
    name: types.string,
    default_value: DateValue,
    values: types.array(types.string)
});

export type DateFilterType = Instance<typeof DateFilter>;
