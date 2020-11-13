import React from 'react'

import { Colors } from './ui/Colors'
import SvgIcon from './SvgIcon'

interface Props {
  id: string
  address: string
  categoryName: string
  datetime: Date
  dead: number
  injured: number
}

export const InfoBalloon = (props: Props) => (
  <div className='balloon'>
    <InfoBalloonContent {...props} />
    <SvgIcon name='pointer' />
  </div>
)

export const InfoBalloonContent = (props: Props) => {
  const dateTime = props.datetime.toLocaleString('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  let injuredMessage = `${props.injured} человек пострадали`
  if (props.injured % 10 === 1 && props.injured !== 11) {
    injuredMessage = `${props.injured} человек пострадал`
  }

  let deadMessage = `${props.dead} человек погибли`
  if (props.dead % 10 === 1 && props.dead !== 11) {
    deadMessage = `${props.dead} человек погиб`
  }

  return (
    <React.Fragment>
      <div className='balloon-header'>
        <h4 className='subtitle1'>{props.categoryName}</h4>
      </div>
      <div className='balloon-body'>
        <p className='body3'>{dateTime}</p>
        <p className='body3'>{props.address}</p>
        {props.injured > 0 && (
          <p className='subtitle3' style={{ color: Colors.$yellow }}>
            {injuredMessage}
          </p>
        )}
        {props.dead > 0 && (
          <p className='subtitle3' style={{ color: Colors.$red }}>
            {deadMessage}
          </p>
        )}
      </div>
      <div className='balloon-footer'>
        <a className='btn-light' href={`https://beta.dtp-stat.ru/dtp/${props.id}`} target='_blank'>
          Подробности ДТП
        </a>
      </div>
    </React.Fragment>
  )
}
