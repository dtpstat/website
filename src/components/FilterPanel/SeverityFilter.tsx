import React, { FC } from 'react'
import { observer } from 'mobx-react'

import { SeverityFilterType } from 'models/filters/SeverityFilter'
import { Colors } from 'components/ui/Colors'

const SeverityFilterSection: FC<SeverityFilterType> = ({ values }) => (
  <ul>
    {values.map((item) => (
      <li key={item.value}>
        <label className='severity-item' tabIndex={0}>
          <input
            type='checkbox'
            checked={item.selected}
            disabled={item.disabled}
            onChange={item.changeSelection}
          />
          <span className='checkmark'>
            <svg className='icon icon-check'>
              <use xlinkHref='svg/sprite.svg#check' />
            </svg>
          </span>
          <div
            className='severity-color'
            style={{
              background: item.disabled ? Colors.$grey50 : item.color,
            }}
          />
          <p
            className='body1'
            style={{
              color: item.disabled ? Colors.$grey50 : Colors.$greyDark,
            }}
          >
            {item.preview}
          </p>
        </label>
      </li>
    ))}
  </ul>
)

export default observer(SeverityFilterSection)
