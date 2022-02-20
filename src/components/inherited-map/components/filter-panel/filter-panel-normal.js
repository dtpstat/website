import { observer } from "mobx-react";
import * as React from "react";

import { useStore } from "../../models/root-store";
import { DateFilter } from "./date-filter";
import { ParticipantsFilter } from "./participants-filter";
import { RegionFilter } from "./region-filter";
import { SeverityFilter } from "./severity-filter";

const FilterSection = ({ filter }) => {
  switch (filter.name) {
    case "date":
      return <DateFilter filter={filter} />;
    case "participant_categories":
      return <ParticipantsFilter {...filter} />;
    case "severity":
      return <SeverityFilter {...filter} />;
    case "region":
      return <RegionFilter {...filter} />;
    default:
      return null;
  }
};

const CategoryTag = observer(({ filter }) => {
  if (filter.values.some((currentFilter) => currentFilter.selected)) {
    return (
      <div className="category-tag active">
        <button
          className="btn-rect"
          onClick={() => {
            filter.navigate();
          }}
        >
          <span>{filter.label}</span>
        </button>
        <button
          className="btn-decline"
          onClick={() => {
            filter.reset();
          }}
        >
          <svg className="icon icon-decline">
            <use xlinkHref="/static/media/svg/sprite.svg#decline" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="category-tag">
      <button
        className="btn-rect"
        onClick={() => {
          filter.navigate();
        }}
      >
        <span>{filter.label}</span>
      </button>
    </div>
  );
});

export const FilterPanelNormal = observer(() => {
  const { filterStore } = useStore();
  const { filters } = filterStore;

  const mainFilters = filters.filter(
    (currentFilter) => currentFilter.name !== "category",
  );
  const categoryFilters = filters.filter(
    (currentFilter) => currentFilter.name === "category",
  );

  return (
    <div className="filter-panel">
      <div className="filter-panel-normal">
        {mainFilters.map((currentFilter) => (
          <div key={currentFilter.name} className="filter-item">
            <p className="subtitle2">{currentFilter.label}</p>
            <FilterSection filter={currentFilter} />
          </div>
        ))}
        <div className="filter-item">
          <p className="subtitle2">Фильтры</p>
          <div className="category-filter">
            {categoryFilters.map((currentFilter) => (
              <CategoryTag key={currentFilter.key} filter={currentFilter} />
            ))}
          </div>
        </div>
      </div>
      <button
        className="btn-hideFilter"
        onClick={() => {
          filterStore.setVisible(false);
        }}
      >
        <svg className="icon icon-arrow-up">
          <use xlinkHref="/static/media/svg/sprite.svg#arrow-up" />
        </svg>
        <span>Скрыть</span>
      </button>
    </div>
  );
});
