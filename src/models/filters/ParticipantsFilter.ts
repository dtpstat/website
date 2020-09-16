import { types } from 'mobx-state-tree';

const ParticipantItem = types
    .model({
        preview: types.string,
        value: types.union(types.number, types.string),
        icon: types.string,
        default: types.boolean,
        selected: types.optional(types.boolean, false),
    })
    .actions((self) => {
        function changeSelection() {
            self.selected = !self.selected;
        }
        return {
            changeSelection,
        };
    });

export const ParticipantsFilter = types.model('ParticipantsFilter', {
    label: types.string,
    multiple: types.boolean,
    name: types.string,
    values: types.array(ParticipantItem),
});
