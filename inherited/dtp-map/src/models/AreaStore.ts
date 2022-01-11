import { flow, types, cast, getRoot, Instance } from "mobx-state-tree";

import { fetchArea } from "api";
import { Coordinate } from "types";
import { isEmpty } from "utils";
import { RootStoreType } from "models/RootStore";

const Area = types.model("Area", {
  id: types.string,
  name: types.string,
  parentId: types.string,
  parentName: types.maybeNull(types.string),
});

const AreaStatistics = types.model("AreaStatistics", {
  count: types.number,
  injured: types.number,
  dead: types.number,
});

export type AreaStatisticsType = Instance<typeof AreaStatistics>;

export const AreaStore = types
  .model("AreaStore", {
    area: types.maybeNull(Area),
    statistics: types.maybeNull(AreaStatistics),
  })
  .actions((self) => {
    const loadArea = flow(function* (center: Coordinate, zoom: number) {
      try {
        const response = yield fetchArea(center, zoom);
        if (isEmpty(response)) {
          return;
        }
        const newArea = Area.create({
          id: response.region_slug,
          name: response.region_name,
          parentId: response.parent_region_slug,
          parentName: response.parent_region_name,
        });
        const areaChanged = newArea.id !== self.area?.id;
        const parentChanged = newArea.parentId !== self.area?.parentId;
        self.area = newArea;
        if (areaChanged) {
          getRoot<RootStoreType>(self).onAreaChanged();
        }
        if (parentChanged) {
          getRoot<RootStoreType>(self).onParentAreaChanged();
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    });
    const setStatistics = (stat: AreaStatisticsType) => {
      self.statistics = cast(stat);
    };
    return {
      loadArea,
      setStatistics,
    };
  });
