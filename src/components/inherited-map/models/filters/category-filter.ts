import { getRoot, Instance, types } from "mobx-state-tree";

import { RootStoreType } from "../root-store";

export const CategoryFilterValue = types
  .model("CategoryFilterValue", {
    preview: types.string,
    value: types.number, // -1 for street
    default: false,
    selected: false,
  })
  .actions((self) => {
    const toggle = () => {
      self.selected = !self.selected;
      getRoot<RootStoreType>(self).onFiltersChanged();
    };
    const reset = () => {
      self.selected = self.default;
    };

    return {
      toggle,
      reset,
    };
  });

export const CategoryFilter = types
  .model("CategoryFilter", {
    name: types.literal("category"),
    key: types.string,
    label: types.string,
    values: types.array(CategoryFilterValue),
  })
  .actions((self) => ({
    reset() {
      for (const value of self.values) {
        value.reset();
      }
      // if (self.key === 'street') {
      //   getRoot<RootStoreType>(self).updateStreets() TODO // clear previously selected streets from another region
      // }
      getRoot<RootStoreType>(self).onFiltersChanged();
    },
    navigate() {
      getRoot<RootStoreType>(self).filterStore.setCurrentKey(self.key);
    },
  }));

export type CategoryFilterType = Instance<typeof CategoryFilter>;
