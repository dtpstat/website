import { observer } from "mobx-react";
import * as React from "react";

import { useStore } from "../../models/root-store";
import { DateFilter } from "./date-filter";

export const FilterPanelHidden = observer(() => {
  const { filterStore } = useStore();
  const { filters } = filterStore;
  const dateFilter = filters.find(
    (currentFilter) => currentFilter.name === "date",
  );
  const activeFilters =
    filters.filter((currentFilter) =>
      currentFilter.values?.some((value) => value.selected !== value.default),
    ) || [];
  const text = activeFilters.map((value) => value.label).join(", ");

  return (
    <div className="filter-panel">
      <div className="filter-panel-hidden">
        <div className="filter-item">
          <p className="subtitle2">{dateFilter.label}</p>
          <DateFilter filter={dateFilter} />
        </div>
        {text && (
          <div className="filter-item">
            <p className="subtitle2">Активные фильтры</p>
            <div className="category-filter">{text}</div>
          </div>
        )}
      </div>
      <button
        className="btn-hideFilter"
        onClick={() => {
          filterStore.setVisible(true);
        }}
      >
        <svg className="icon icon-arrow-up">
          <use xlinkHref="/static/media/svg/sprite.svg#arrow-down" />
        </svg>
        <span>Показать</span>
      </button>
    </div>
  );
});
