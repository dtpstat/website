import { observer } from "mobx-react";
import * as React from "react";

import { useStore } from "../../models/RootStore";
import DateFilter from "./DateFilter";

export const FilterPanelHidden = observer(() => {
  const { filterStore } = useStore();
  const { filters } = filterStore;
  const dateFilter = filters.find((f) => f.name === "date");
  const activeFilters =
    filters.filter((f) => f.values?.some((v) => v.selected !== v.default)) ||
    [];
  const text = activeFilters.map((f) => f.label).join(", ");

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
        onClick={(e) => filterStore.setVisible(true)}
      >
        <svg className="icon icon-arrow-up">
          <use xlinkHref="/static/media/svg/sprite.svg#arrow-down" />
        </svg>
        <span>Показать</span>
      </button>
    </div>
  );
});
