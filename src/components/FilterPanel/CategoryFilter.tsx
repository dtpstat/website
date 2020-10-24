import { observer } from 'mobx-react'
import React from 'react'

import { ExtraFilterResponse } from '../../types'

const CategoryFilter = ({ values }: ExtraFilterResponse) => (
  <div className='category-filter'>
    <div className='category-item__draw' tabIndex={0}>
      <svg className='icon icon-edit'>
        <use xlinkHref='svg/sprite.svg#edit' />
      </svg>
      <button className='btn-rect'>Выделить участок</button>
    </div>
    {values.map(({ preview, value }) => (
      <div key={value} className='category-tag' tabIndex={0}>
        <button className='btn-rect'>
          <span>{preview}</span>
        </button>
        <button className='btn-decline'>
          <svg className='icon icon-decline'>
            <use xlinkHref='svg/sprite.svg#decline' />
          </svg>
        </button>
      </div>
    ))}
  </div>
)

export default observer(CategoryFilter)
