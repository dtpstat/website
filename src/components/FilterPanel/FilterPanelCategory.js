import React from 'react'
import { observer } from 'mobx-react'

import { useStore } from 'models/RootStore'

import CategoryHeader from './CategoryHeader'

const CategoryValue = observer(({ value }) => (
  <label className='category-value severity-item' tabIndex={0}>
    <input type='checkbox' checked={value.selected} onChange={(e) => value.toggle()} />
    <span className='checkmark'>
      <svg className='icon icon-check'>
        <use xlinkHref='svg/sprite.svg#check' />
      </svg>
    </span>
    <span className='value-preview body1'>{value.preview}</span>
  </label>
))

export const FilterPanelCategory = observer(() => {
  const { filterStore } = useStore()
  const { filters } = filterStore
  const filter = filters.find((f) => f.key === filterStore.currentKey)
  const q = filterStore.search.toLowerCase()
  return (
    <div className='filter-panel-category'>
      <CategoryHeader />
      <div className='panel-content'>
        {filter.values
          .filter((v) => v.preview.toLowerCase().includes(q))
          .map((v) => (
            <CategoryValue key={v.value === -1 ? v.preview : v.value} value={v} />
          ))}
      </div>
    </div>
  )
})
