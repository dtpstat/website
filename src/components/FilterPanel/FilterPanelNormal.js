import { observer } from "mobx-react";
import * as React from "react";

import { useStore } from "../../models/RootStore";
import DateFilter from "./DateFilter";
import ParticipantsFilter from "./ParticipantsFilter";
import RegionFilter from "./RegionFilter";
import SeverityFilter from "./SeverityFilter";

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
  if (filter.values.some((v) => v.selected)) {
    return (
      <div className="category-tag active">
        <button className="btn-rect" onClick={(e) => filter.navigate()}>
          <span>{filter.label}</span>
        </button>
        <button className="btn-decline" onClick={(e) => filter.reset()}>
          <svg className="icon icon-decline">
            <use xlinkHref="/static/media/svg/sprite.svg#decline" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="category-tag">
      <button className="btn-rect" onClick={(e) => filter.navigate()}>
        <span>{filter.label}</span>
      </button>
    </div>
  );
});

export const FilterPanelNormal = observer(() => {
  const { filterStore } = useStore();
  const { filters } = filterStore;

  const mainFilters = filters.filter((f) => f.name !== "category");
  const categoryFilters = filters.filter((f) => f.name === "category");

  return (
    <div className="filter-panel">
      <div className="filter-panel-normal">
        {mainFilters.map((f) => (
          <div key={f.name} className="filter-item">
            <p className="subtitle2">{f.label}</p>
            <FilterSection filter={f} />
          </div>
        ))}
        <div className="filter-item">
          <p className="subtitle2">Фильтры</p>
          <div className="category-filter">
            {categoryFilters.map((f) => (
              <CategoryTag key={f.key} filter={f} />
            ))}
          </div>
        </div>
      </div>
      <button
        className="btn-hideFilter"
        onClick={(e) => filterStore.setVisible(false)}
      >
        <svg className="icon icon-arrow-up">
          <use xlinkHref="/static/media/svg/sprite.svg#arrow-up" />
        </svg>
        <span>Скрыть</span>
      </button>
    </div>
  );
});
