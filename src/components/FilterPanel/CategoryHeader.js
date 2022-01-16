import * as React from "react";
import { observer } from "mobx-react";

import { useStore } from "../../models/RootStore";

const CategoryHeader = () => {
  const { filterStore } = useStore();
  const filter = filterStore.filters.find(
    (f) => f.key === filterStore.currentKey,
  );
  const handleBack = (e) => {
    filterStore.setCurrentKey(null);
    filterStore.setSearch("");
  };
  return (
    <div className="filter-header">
      <button className="btn-back" onClick={handleBack}>
        <svg className="icon icon-arrow-back">
          <use xlinkHref="svg/sprite.svg#arrow-back" />
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
          placeholder="Введите название нарушения"
          value={filterStore.search}
          onChange={(e) => filterStore.setSearch(e.target.value)}
        />
        {/* maybe it should be button not just svg */}
        <button className="btn-search">
          <svg className="icon icon-search">
            <use xlinkHref="svg/sprite.svg#search" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default observer(CategoryHeader);
