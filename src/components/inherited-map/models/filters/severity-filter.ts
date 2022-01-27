import { getRoot, Instance, types } from "mobx-state-tree";

import { RootStoreType } from "../root-store";

const SeverityItem = types
  .model("SeverityItem", {
    preview: types.string,
    value: types.number,
    color: types.string,
    description: types.string && types.null,
    disabled: types.boolean,
    default: types.boolean,
    selected: false,
  })
  .actions((self) => {
    const afterCreate = () => {
      self.selected = self.default;
    };
    function changeSelection() {
      self.selected = !self.selected;
      getRoot<RootStoreType>(self).onFiltersChanged();
    }

    return {
      afterCreate,
      changeSelection,
    };
  });

export const SeverityFilter = types.model("SeverityFilter", {
  name: types.literal("severity"),
  label: types.string,
  multiple: types.boolean,
  values: types.array(SeverityItem),
});

export type SeverityFilterType = Instance<typeof SeverityFilter>;
