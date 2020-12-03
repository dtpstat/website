import React from 'react'
import { observer } from 'mobx-react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker, createStaticRanges } from 'react-date-range'
import { parseISO, format, subMonths, lastDayOfMonth, startOfMonth } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

import { Colors } from 'components/ui/Colors'

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
    if (e.selection.endDate > e.selection.startDate) {
      filter.setValue({
        start_date: formatDate(e.selection.startDate),
        end_date: formatDate(e.selection.endDate),
      })
      setShow(false)
    }
  }
  const handleCancel = (e) => {
    setShow(false)
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
            fixedHeight={true}
            direction='horizontal'
          />
          <div className='date-bottom'>
            <button className='btn-light' onClick={handleCancel}>
              Отмена
            </button>
            {/* <button className='btn-dark' onClick={handleApply}>
              Применить
            </button> */}
          </div>
        </div>
      )}
    </div>
  )
}

const formatDate = (date) => format(date, 'yyyy-MM-dd')

const formatRange = (range) => {
  const f = 'dd.MM.yyyy'
  return `${format(range.startDate, f)} - ${format(range.endDate, f)}`
}

const getPrevMonth = (n) => {
  const p = subMonths(new Date(), n)
  const s = format(p, 'LLLL', { locale: ruLocale })
  return {
    label: s[0].toLocaleUpperCase('ru') + s.substring(1),
    range: () => ({ startDate: startOfMonth(p), endDate: lastDayOfMonth(p) }),
  }
}

const getStaticRanges = () => {
  const result = []
  const year = new Date().getFullYear()
  for (let i = 1; i <= 2; i++) {
    result.push(getPrevMonth(i))
  }
  for (let i = year; i > year - 6; i--) {
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
