import React from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { observer } from 'mobx-react'

import { useStore } from 'models/RootStore'
import { FilterResponse } from 'types'

import ParticipantsFilter from './ParticipantsFilter'
import SeverityFilter from './SeverityFilter'
import CategoryFilter from './CategoryFilter'
import DateFilter from './DateFilter'

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const FilterComponent = ({ filter }: { filter: FilterResponse }) => {
  switch (filter.name) {
    case 'category':
      return <CategoryFilter {...filter} />
    case 'date':
      return <DateFilter {...filter} />
    case 'severity':
      return <SeverityFilter {...filter} />
    case 'participant_categories':
      return <ParticipantsFilter {...filter} />
    default:
      return null
  }
}

const FilterPanel = () => {
  const { filterStore } = useStore()
  const { filters } = filterStore

  if (filters.length === 0) {
    return null
  }

  return (
    <div className='filter-panel'>
      {/* {CategoryHeader()} */}
      <div className='filter-content'>
        {filters.map((filter) => (
          <div key={filter.name} className='filter-item'>
            <p className='subtitle2'>{filter.label}</p>
            <FilterComponent {...{ filter }} />
          </div>
        ))}
      </div>

      <button className='btn-hideFilter'>
        <svg className='icon icon-arrow-up'>
          <use xlinkHref='svg/sprite.svg#arrow-up' />
        </svg>
        <span>Скрыть</span>
      </button>
    </div>
  )
}

export default observer(FilterPanel)
