import { Instance, types } from "mobx-state-tree";

export const RegionFilter = types.model("RegionFilter", {
  name: types.literal("region"),
  label: types.string,
  values: types.array(types.number),
});

export type RegionFilterType = Instance<typeof RegionFilter>;
