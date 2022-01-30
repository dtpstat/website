import { getParent, getRoot, Instance, types } from "mobx-state-tree";

import { RootStoreType } from "../root-store";

const ParticipantItem = types
  .model("ParticipantItem", {
    preview: types.string,
    value: types.number,
    icon: types.string,
    default: types.boolean,
    selected: false,
  })
  .actions((self) => {
    const afterCreate = () => {
      self.selected = self.default;
    };
    const setSelected = (value: boolean) => {
      self.selected = value;
    };
    const selectOne = () => {
      if (!self.selected) {
        // @ts-expect-error -- TODO: investigate
        for (const v of getParent(self)) {
          v.setSelected(v === self);
        }
        getRoot<RootStoreType>(self).onFiltersChanged();
      }
    };

    return {
      afterCreate,
      setSelected,
      selectOne,
    };
  });

export const ParticipantsFilter = types.model("ParticipantsFilter", {
  name: types.literal("participant_categories"),
  label: types.string,
  multiple: types.boolean,
  values: types.array(ParticipantItem),
});

export type ParticipantsFilterType = Instance<typeof ParticipantsFilter>;
