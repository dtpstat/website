import { observer } from "mobx-react";
import * as React from "react";

import { minZoomForHeatmap, useStore } from "../../models/root-store";
import { FilterPanelCategory } from "./filter-panel-category";
import { FilterPanelHidden } from "./filter-panel-hidden";
import { FilterPanelNormal } from "./filter-panel-normal";

export const FilterPanel = observer(() => {
  const { filterStore, mapStore } = useStore();
  const { filters } = filterStore;
  const { zoom } = mapStore;

  if (filters.length === 0 || zoom < minZoomForHeatmap) {
    return null;
  }

  if (filterStore.visible) {
    if (filterStore.currentKey) {
      return <FilterPanelCategory />;
    }

    return <FilterPanelNormal />;
  } else {
    return <FilterPanelHidden />;
  }
});
