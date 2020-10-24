import { observer } from 'mobx-react'
import React from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'

import { DateFilterType } from 'models/filters/DateFilter'

moment.defaultFormat = 'YYYY-MM-DD'

const getRanges = () => {
  const ranges: any = {}
  for (let i = moment().year() - 5; i <= moment().year(); i++) {
    ranges[i.toString()] = [moment([i]), moment([i, 11, 31])]
  }
  ranges['За всё время'] = [moment([moment().year() - 5]), moment()]
  return ranges
}

const DateFilterSection = ({ filter }: { filter: DateFilterType }) => (
  <div className='inputWrap'>
    <DateRangePicker
      initialSettings={{
        locale: {
          format: 'DD.MM.YYYY',
          cancelLabel: 'Отмена',
          applyLabel: 'Применить',
        },
        alwaysShowCalendars: true,
        autoUpdateInput: true,
        showCustomRangeLabel: false,
        startDate: moment(filter.value.start_date),
        endDate: moment(filter.value.end_date),
        ranges: getRanges(),
        buttonClasses: 'btn-light',
      }}
      onApply={(e, p) => {
        filter.setValue({ start_date: p.startDate.format(), end_date: p.endDate.format() })
      }}
    >
      <input type='text' className='input' />
    </DateRangePicker>
    <svg className='icon icon-calendar'>
      <use xlinkHref='svg/sprite.svg#calendar' />
    </svg>
  </div>
)

export default observer(DateFilterSection)
