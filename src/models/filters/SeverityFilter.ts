import { types } from 'mobx-state-tree';

const SeverityItem = types.model('SeverityItem', {
    preview: types.string,
    value: types.number,
    color: types.string,
    disabled: types.boolean,
    default: types.boolean,
});

export const SeverityFilter = types.model('SeverityFilter', {
    label: types.string,
    multiple: types.boolean,
    name: types.string,
    values: types.array(SeverityItem),
});
