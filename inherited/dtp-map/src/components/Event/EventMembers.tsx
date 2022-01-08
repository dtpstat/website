import React from 'react'
import { Colors } from 'components/ui/Colors'
import MemberCard from './MemberCard'

const EventMembers = () => {
  return (
    <div style={{ marginBottom: '32px', overflow: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <MemberCard
          icon='pedestrian'
          color={Colors.$yellow}
          name='Пешеход'
          gender='Мужчина'
          descr='Раненый, находящийся на стационарном лечении'
        />
        <MemberCard icon='bike' name='Велосипедист' gender='Женщина' descr='Не пострадала' />
      </div>

      <h3 className='h3' style={{ marginBottom: '12px' }}>
        Infiniti (FX-серия), 2011
      </h3>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <MemberCard
          icon='wheel'
          color={Colors.$red}
          name='Водитель'
          gender='Мужчина'
          exp='стаж — 24 года'
          descr='Скончался на месте ДТП до приезда скорой помощи'
          add='Нарушение требований линии разметки'
        />
        <MemberCard
          icon='profile'
          name='Пассажир'
          gender='Женщина'
          descr='Скончался на месте ДТП до приезда скорой помощи'
        />
        <MemberCard
          icon='motorbike'
          name='Пассажир'
          gender='Женщина'
          descr='Скончался на месте ДТП до приезда скорой помощи'
        />
        <MemberCard
          icon='bike'
          name='Пассажир'
          gender='Женщина'
          descr='Скончался на месте ДТП до приезда скорой помощи'
        />
      </div>
    </div>
  )
}

export default EventMembers
