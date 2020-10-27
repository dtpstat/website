import React from 'react'
import { observer } from 'mobx-react'

import { useStore } from 'models/RootStore'

import DateFilter from './DateFilter'
import ParticipantsFilter from './ParticipantsFilter'
import SeverityFilter from './SeverityFilter'
import RegionFilter from './RegionFilter'

const FilterSection = ({ filter }) => {
  switch (filter.name) {
    case 'date':
      return <DateFilter filter={filter} />
    case 'participant_categories':
      return <ParticipantsFilter {...filter} />
    case 'severity':
      return <SeverityFilter {...filter} />
    case 'region':
      return <RegionFilter {...filter} />
    default:
      return null
  }
}

const CategoryTag = observer(({ filter }) => (
  <div key={filter.key} className='category-tag' tabIndex={0}>
    <button className='btn-rect' onClick={(e) => filter.navigate()}>
      <span>{filter.label}</span>
    </button>
  </div>
))

const CategoryActiveTag = observer(({ filter }) => (
  <div key={filter.key} className='category-tag active' tabIndex={0}>
    <button className='btn-rect' onClick={(e) => filter.reset()}>
      <span>{filter.label}</span>
    </button>
    <button className='btn-decline'>
      <svg className='icon icon-decline'>
        <use xlinkHref='svg/sprite.svg#decline' />
      </svg>
    </button>
  </div>
))

export const FilterPanelNormal = observer(() => {
  const { filterStore } = useStore()
  const { filters } = filterStore

  const mainFilters = filters.filter((f) => f.name !== 'category')
  const categoryFilters = filters.filter((f) => f.name === 'category')
  const activeFilters = categoryFilters.filter((f) => f.values.some((v) => v.selected))

  return (
    <div className='filter-panel'>
      <div className='panel-content'>
        {mainFilters.map((f) => (
          <div key={f.name} className='filter-item'>
            <p className='subtitle2'>{f.label}</p>
            <FilterSection filter={f} />
          </div>
        ))}
        <div className='filter-item'>
          <p className='subtitle2'>Фильтры</p>
          <div className='category-filter'>
            {activeFilters.map((f) => (
              <CategoryActiveTag filter={f} />
            ))}
          </div>
          <div className='category-filter'>
            {categoryFilters.map((f) => (
              <CategoryTag filter={f} />
            ))}
          </div>
        </div>
      </div>

      <button className='btn-hideFilter' onClick={(e) => filterStore.setVisible(false)}>
        <svg className='icon icon-arrow-up'>
          <use xlinkHref='svg/sprite.svg#arrow-up' />
        </svg>
        <span>Скрыть</span>
      </button>
    </div>
  )
})
