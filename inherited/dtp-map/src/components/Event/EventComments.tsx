import React from 'react'
import { Colors } from 'components/ui/Colors'

const EventComments = () => {
  return (
    <div className='event-comments'>
      <h2 className='h2' style={{ marginBottom: '16px' }}>
        Комментарии — 2
      </h2>
      <div className='comment'>
        <div className='ava' style={{ backgroundColor: Colors.$greyLight }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className='subtitle1' style={{ marginRight: '8px' }}>
            Павел Кучерягин
          </p>
          <p className='body2'>23 апреля 2020</p>
        </div>
        <p className='body1'>
          информация о верификации данных, если координаты изменены при обработке (координаты
          отличаются от заявленных ГИБДД, но прошли подтверждение модератором).
        </p>
      </div>
      <div className='comment'>
        <div className='ava' style={{ backgroundColor: Colors.$greyLight }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className='subtitle1' style={{ marginRight: '8px' }}>
            Павел Кучерягин
          </p>
          <p className='body2'>23 апреля 2020</p>
        </div>
        <p className='body1'>
          информация о верификации данных, если координаты изменены при обработке (координаты
          отличаются от заявленных ГИБДД, но прошли подтверждение модератором).
        </p>
      </div>
      <div className='input-comment'>
        <div className='ava' style={{ backgroundColor: Colors.$greyDark }}></div>
        <input type='text' className='input' placeholder='Добавить комментарий...' />
        <button className='btn-dark'>Отправить</button>
      </div>
    </div>
  )
}

export default EventComments
