import React from 'react'
import SvgIcon from '../SvgIcon'
import { Colors } from 'components/ui/Colors'

const EventHeader = () => {
  return (
    <div className='event-header'>
      <button className='btn-gallery' style={{ marginRight: '32px' }}>
        <span className='gallery-count'>
          <SvgIcon name='photo' />6 фото
        </span>
      </button>
      <div style={{ width: '100%' }}>
        <div className='btns-container'>
          <button className='btn-viewmap'>
            <SvgIcon name='map' />
            <span className='caption'>Перейти на карту</span>
          </button>
          <label className='viewSwitch' tabIndex={0}>
            <input type='checkbox' />
            <span className='viewSwitch-slider'></span>
            <span className='viewSwitch-btn'>
              <SvgIcon name='location' />
              <span className='caption'>Карта</span>
            </span>
            <span className='viewSwitch-btn'>
              <SvgIcon name='videocamera' />
              <span className='caption'>Панорама</span>
            </span>
          </label>
        </div>
        <p
          className='body1'
          style={{ display: 'flex', marginBottom: '12px', color: Colors.$greyDark }}
        >
          Среда, 29 апреля 2020 в 17:28{' '}
          <span style={{ color: Colors.$grey20, margin: '0 8px' }}>|</span> г Санкт-Петербург, ул
          Нижняя-Сырмятническая, 46к4
        </p>
        <h1 className='h1' style={{ marginBottom: '14px' }}>
          Выезд на полосу встречного движения
        </h1>

        <div className='header-info-container'>
          <div className='header-info'>
            <SvgIcon name='car' color={'rgba(24, 51, 74, 0.5)'} />
            <p style={{ color: Colors.$grey50 }}>Повреждено</p>
            <p style={{ color: Colors.$greyDark, fontWeight: 500 }}>3 машины</p>
          </div>
          <div className='header-info'>
            <SvgIcon name='profile-circle' color={'rgba(24, 51, 74, 0.5)'} />
            <p style={{ color: Colors.$grey50 }}>Участники</p>
            <p style={{ color: Colors.$greyDark, fontWeight: 500 }}>9 человек</p>
          </div>
          <div className='header-info'>
            <SvgIcon name='profile' color={Colors.$red} />
            <p style={{ color: Colors.$grey50 }}>Погибли</p>
            <p style={{ color: Colors.$red, fontWeight: 500 }}>4 человека</p>
          </div>
          <div className='header-info'>
            <SvgIcon name='profile' color={Colors.$yellow} />
            <p style={{ color: Colors.$grey50 }}>Пострадали</p>
            <p style={{ color: Colors.$yellow, fontWeight: 500 }}>2 человека</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventHeader
