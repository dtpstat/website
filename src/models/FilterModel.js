import { types } from 'mobx-state-tree';

const DateDefaultValueModel = types.model('DateDefaultValueModel', {
    startDate: types.string,
    endDate: types.string,
});

export const DateFilterModel = types.model('DateFilterModel', {
    label: types.string,
    name: types.string,
    defaultValue: DateDefaultValueModel
});

export const FilterModel = types.model('FilterModel', {
    label: types.string,
    multiple: types.boolean,
    name: types.string,
});
