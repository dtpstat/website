import React from 'react'
import Footer from 'components/Footer/Footer'
import NewsItem from './NewsItem'

const Articles = () => {
  return (
    <div className='articles-container'>
      <h1 className='h1'>Статьи и исследования</h1>
      <div className='articles'>
        <NewsItem
          title='Великая автомобилизация в Великих Луках'
          img='https://assets3.thrillist.com/v1/image/2824030/414x310/crop;jpeg_quality=65.jpg'
          link='#'
          text='Великолукские чиновники решили не останавливаться на прошлогоднем «достижении» — строительстве трёх подземных переходов. Теперь хотят расширять главный проспект'
          tags={['Города', 'Исследования']}
        />
        <NewsItem
          title='Негативная реакция — хороший знак для велосипедистов'
          img='https://assets3.thrillist.com/v1/image/2824030/414x310/crop;jpeg_quality=65.jpg'
          link='#'
          text='Резко негативное отношение к велосипедистам в обществе на деле оказывается неотъемлемым этапом на пути к повсеместному распространению велодвижения'
          tags={['Велосипеды']}
        />
        <NewsItem
          title='Новосибирская команда по спасению мира'
          img='https://assets3.thrillist.com/v1/image/2824030/414x310/crop;jpeg_quality=65.jpg'
          link='#'
          text='Как дела в Новосибирске? Там в Совет депутатов идет отличная команда. А еще начинает работу наш штаб, который этой команде поможет собрать подписи для выдвижения'
        />
        <NewsItem
          title='БДСМ в Кемерово (ну, почти)'
          img='https://assets3.thrillist.com/v1/image/2824030/414x310/crop;jpeg_quality=65.jpg'
          link='#'
          text='Формат прогулок с мэрами в стиле Ильи Варламова продолжают наши региональные отделения. На днях прогулялись по Кемерово'
        />
      </div>
      <Footer />
    </div>
  )
}

export default Articles
