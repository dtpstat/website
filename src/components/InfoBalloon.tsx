import React from 'react'

import { Colors } from './ui/Colors'
import SvgIcon from './SvgIcon'

interface Props {
  address: string
  categoryName: string
  datetime: Date
  dead: number
  injured: number
}

const InfoBalloon = (props: Props) => {
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
    <div className='balloon'>
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
        <button className='btn-light'>Подробности ДТП</button>
      </div>
      <SvgIcon name='pointer' />
    </div>
  )
}

export default InfoBalloon
