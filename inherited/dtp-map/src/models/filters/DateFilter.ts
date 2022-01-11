import { Instance, types, cast, getRoot } from "mobx-state-tree";

import { RootStoreType } from "../RootStore";

const DateValue = types.model("DateValue", {
  start_date: types.string,
  end_date: types.string,
});

export const DateFilter = types
  .model("DateFilter", {
    name: types.literal("date"),
    label: types.string,
    default_value: DateValue,
    // values: types.array(types.string),
    value: types.optional(DateValue, { start_date: "", end_date: "" }), // TODO?
  })
  .actions((self) => {
    const afterCreate = () => {
      self.value = self.default_value;
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
