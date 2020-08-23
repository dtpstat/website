import { types } from 'mobx-state-tree';

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
