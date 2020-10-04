import { observer } from 'mobx-react'
import React, { FC } from 'react'

const DateFilterSection: FC<any> = () => (
  <div>
    <div className='inputWrap'>
      <input type='text' className='input' defaultValue='Март 2015 — Декабрь 2018' />
      <svg className='icon icon-calendar'>
        <use xlinkHref='svg/sprite.svg#calendar' />
      </svg>
    </div>
  </div>
)

export default observer(DateFilterSection)
