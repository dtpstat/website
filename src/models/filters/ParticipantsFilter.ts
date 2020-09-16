import { types } from 'mobx-state-tree';

const ParticipantItem = types.model({
    preview: types.string,
    value: types.union(types.number, types.string),
    icon: types.string,
    default: types.boolean,
});

export const ParticipantsFilter = types.model('ParticipantsFilter', {
    label: types.string,
    multiple: types.boolean,
    name: types.string,
    values: types.array(ParticipantItem),
});
