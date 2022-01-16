import { observer } from "mobx-react";
import { useStore } from "../../models/RootStore";
import * as React from "react";

import { FilterPanelCategory } from "./FilterPanelCategory";
import { FilterPanelHidden } from "./FilterPanelHidden";
import { FilterPanelNormal } from "./FilterPanelNormal";

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
