import { cast, getRoot, Instance, types } from "mobx-state-tree";

import { RootStoreType } from "../RootStore";

const DateValue = types.model("DateValue", {
  startDate: types.string,
  endDate: types.string,
});

export const DateFilter = types
  .model("DateFilter", {
    name: types.literal("date"),
    label: types.string,
    defaultValue: DateValue,
    // values: types.array(types.string),
    value: types.optional(DateValue, { startDate: "", endDate: "" }), // TODO?
  })
  .actions((self) => {
    const afterCreate = () => {
      self.value = self.defaultValue;
    };
    const setValue = (value: any) => {
      self.value = cast(value);
      getRoot<RootStoreType>(self).onDatesChanged();
    };

    return {
      afterCreate,
      setValue,
    };
  });

export type DateFilterType = Instance<typeof DateFilter>;
