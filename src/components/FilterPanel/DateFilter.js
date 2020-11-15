import React from 'react'
import { observer } from 'mobx-react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker, createStaticRanges } from 'react-date-range'
import { parseISO, format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

import { Colors } from 'components/ui/Colors'

const formatRange = (range) => {
  const f = 'dd.MM.yyyy'
  return `${format(range.startDate, f)} - ${format(range.endDate, f)}`
}

const formatDate = (date) => format(date, 'yyyy-MM-dd')

const DateFilterSection = ({ filter }) => {
  const defaultRange = {
    startDate: parseISO(filter.value.start_date),
    endDate: parseISO(filter.value.end_date),
    key: 'selection',
  }
  const [show, setShow] = React.useState(false)
  const [range, setRange] = React.useState(defaultRange)
  const handleChange = (e) => {
    setRange(e.selection)
  }
  const handleApply = (e) => {
    filter.setValue({
      start_date: formatDate(range.startDate),
      end_date: formatDate(range.endDate),
    })
    setShow(false)
  }
  const handleCancel = (e) => {
    setShow(false)
    setRange(defaultRange)
  }
  return (
    <div>
      <div className='inputWrap'>
        <input
          type='text'
          className='input'
          onFocus={(e) => setShow(true)}
          readOnly
          value={formatRange(defaultRange)}
        />
        <svg className='icon icon-calendar'>
          <use xlinkHref='svg/sprite.svg#calendar' />
        </svg>
      </div>
      {show && (
        <div className='date-wrap'>
          <DateRangePicker
            locale={ruLocale}
            onChange={handleChange}
            showDateDisplay={false}
            months={2}
            ranges={[range]}
            rangeColors={[Colors.$grey70]}
            inputRanges={[]}
            staticRanges={staticRanges}
            showSelectionPreview={false}
            fixedHeight={true}
            direction='horizontal'
          />
          <div className='date-bottom'>
            <button className='btn-light' onClick={handleCancel}>
              Отмена
            </button>
            <button className='btn-dark' onClick={handleApply}>
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const getStaticRanges = () => {
  const result = []
  const year = new Date().getFullYear()
  for (let i = year; i >= year - 5; i--) {
    result.push({
      label: i.toString(),
      range: () => ({ startDate: new Date(i, 0, 1), endDate: new Date(i, 11, 31) }),
    })
  }
  result.push({
    label: 'За всё время',
    range: () => ({ startDate: new Date(year - 5, 0, 1), endDate: new Date() }),
  })
  return createStaticRanges(result)
}

const staticRanges = getStaticRanges()

export default observer(DateFilterSection)
