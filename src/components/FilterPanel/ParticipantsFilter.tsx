import { observer } from 'mobx-react'
import React, { FC } from 'react'

import config from '../../config'
import { ParticipantFilter } from '../../types'

const ParticipantsFilterSection: FC<ParticipantFilter> = ({ values }) => (
  <div className='participant-filter'>
    {values.map((item) => (
      <button
        key={item.value}
        className={item.selected ? 'participant-item active' : 'participant-item'}
        // selected={item.selected}
        tabIndex={0}
        onClick={item.changeSelection}
      >
        {
          <object
            type='image/svg+xml'
            data={`${config.STATIC_URL}${item.icon}`}
            aria-label={item.preview}
          />
        }
        <p className='subtitle3'>{item.preview}</p>
      </button>
    ))}
  </div>
)

export default observer(ParticipantsFilterSection)
