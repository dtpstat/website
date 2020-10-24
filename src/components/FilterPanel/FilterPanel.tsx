import React from 'react'
import { observer } from 'mobx-react'

import { useStore } from 'models/RootStore'

import DateFilter from './DateFilter'
import ParticipantsFilter from './ParticipantsFilter'
import SeverityFilter from './SeverityFilter'
import ExtraFilter from './ExtraFilter'
// import { CategoryHeader } from './CategoryHeader'
import { FilterType } from '../../models/FilterStore'

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const FilterComponent = ({ filter }: { filter: FilterType }) => {
  switch (filter.name) {
    case 'date':
      return <DateFilter filter={filter} />
    case 'participant_categories':
      return <ParticipantsFilter {...filter} />
    case 'severity':
      return <SeverityFilter {...filter} />
    case 'extra':
      return <ExtraFilter {...filter} />
    default:
      return null
  }
}

const FilterPanel = () => {
  React.useEffect(() => {}, [])

  const { filterStore } = useStore()
  const { filters } = filterStore

  if (filters.length === 0) {
    return null
  }

  return (
    <div className='filter-panel'>
      {/* <CategoryHeader /> */}
      <div className='filter-content'>
        {filters.map((filter: any) => (
          <div key={filter.key || filter.name} className='filter-item'>
            <p className='subtitle2'>{filter.label}</p>
            <FilterComponent filter={filter} />
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
