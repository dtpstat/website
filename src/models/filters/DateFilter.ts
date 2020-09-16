import { Instance, types } from 'mobx-state-tree';

const DateDefaultValue = types.model('DateDefaultValue', {
    start_date: types.string,
    end_date: types.string,
});

export const DateFilter = types.model('DateFilter', {
    label: types.string,
    name: types.string,
    default_value: DateDefaultValue,
    values: types.array(types.string),
});

export type DateFilterType = Instance<typeof DateFilter>;
