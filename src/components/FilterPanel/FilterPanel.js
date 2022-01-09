import React from "react";
import { observer } from "mobx-react";

import { useStore } from "../../models/RootStore";

import { FilterPanelNormal } from "./FilterPanelNormal";
import { FilterPanelHidden } from "./FilterPanelHidden";
import { FilterPanelCategory } from "./FilterPanelCategory";

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
