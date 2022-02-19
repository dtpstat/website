import { observer } from "mobx-react";
import * as React from "react";

import { useStore } from "../../models/root-store";

const CategoryHeader = () => {
  const { filterStore } = useStore();
  const filter = filterStore.filters.find(
    (currentFilter) => currentFilter.key === filterStore.currentKey,
  );
  const handleBack = () => {
    filterStore.setCurrentKey(null);
    filterStore.setSearch("");
  };

  return (
    <div className="filter-header">
      <button className="btn-back" onClick={handleBack}>
        <svg className="icon icon-arrow-back">
          <use xlinkHref="/static/media/svg/sprite.svg#arrow-back" />
        </svg>
        <span>{filter.label}</span>
      </button>
      {/* {selectedValues && (
        <div className='tags-wrap'>
          {filter.values
            .filter((v) => v.selected)
            .map((v) => (
              <div key={v.value} className='category-tag-light' tabIndex={0}>
                <button className='btn-light' onClick={(e) => v.toggle()}>
                  <span>{v.preview}</span>
                  <svg className='icon icon-decline'>
                    <use xlinkHref='svg/sprite.svg#decline' />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      )} */}
      <div className="inputWrap">
        <input
          type="text"
          className="input"
          placeholder="Поиск"
          value={filterStore.search}
          onChange={(event) => filterStore.setSearch(event.target.value)}
        />
        {/* maybe it should be button not just svg */}
        <button className="btn-search">
          <svg className="icon icon-search">
            <use xlinkHref="/static/media/svg/sprite.svg#search" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default observer(CategoryHeader);
