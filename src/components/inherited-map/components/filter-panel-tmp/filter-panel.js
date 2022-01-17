import { observer } from "mobx-react";
import * as React from "react";

import { useStore } from "../../models/root-store";
import { FilterPanelCategory } from "./filter-panel-category";
import { FilterPanelHidden } from "./filter-panel-hidden";
import { FilterPanelNormal } from "./filter-panel-normal";

const FilterPanel = () => {
  const { filterStore } = useStore();
  const { filters } = filterStore;

  if (filters.length === 0) {
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
};

export default observer(FilterPanel);
