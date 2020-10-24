export const filtersData = [
  {
    name: 'date',
    label: 'Период данных',
    // values: ['2015-01-01', '2020-09-30'],
    default_value: { start_date: '2020-09-01', end_date: '2020-09-30' },
  },
  {
    name: 'participant_categories',
    label: 'Участники ДТП',
    multiple: false,
    values: [
      { preview: 'Все участники', value: 6, icon: '/static/media/all.svg', default: true },
      { preview: 'Пешеходы', value: 1, icon: '/static/media/pedestrians.svg', default: false },
      { preview: 'Велосипедисты', value: 2, icon: '/static/media/velo.svg', default: false },
      { preview: 'Мотоциклисты', value: 3, icon: '/static/media/moto.svg', default: false },
      {
        preview: 'Общ. транспорт',
        value: 4,
        icon: '/static/media/public_transport.svg',
        default: false,
      },
      { preview: 'Дети', value: 5, icon: '/static/media/kids.svg', default: false },
    ],
  },
  {
    name: 'severity',
    label: 'Вред здоровью',
    multiple: true,
    values: [
      {
        preview: 'Без пострадавших (нет данных)',
        value: 0,
        color: 'rgba(24, 51, 74, 0.5)',
        disabled: true,
        default: false,
      },
      { preview: 'Легкий', value: 1, color: '#FFB81F', disabled: false, default: true },
      { preview: 'Тяжёлый', value: 3, color: '#FF7F24', disabled: false, default: true },
      { preview: 'С погибшими', value: 4, color: '#FF001A', disabled: false, default: true },
    ],
  },
  {
    name: 'extra',
    key: 'category',
    label: 'Типы ДТП',
    multiple: true,
    values: [
      {
        preview:
          'Возгорание вследствие технической неисправности движущегося или остановившегося ТС, участвующего в дорожном движении.',
        value: 18,
      },
      { preview: 'Иной вид ДТП', value: 10 },
      { preview: 'Наезд на велосипедиста', value: 5 },
      { preview: 'Наезд на внезапно возникшее препятствие', value: 16 },
      { preview: 'Наезд на гужевой транспорт', value: 13 },
      { preview: 'Наезд на животное', value: 8 },
      {
        preview:
          'Наезд на лицо, не являющееся участником дорожного движения, осуществляющее какую-либо другую деятельность',
        value: 11,
      },
      {
        preview:
          'Наезд на лицо, не являющееся участником дорожного движения, осуществляющее несение службы',
        value: 14,
      },
      {
        preview:
          'Наезд на лицо, не являющееся участником дорожного движения, осуществляющее производство работ',
        value: 15,
      },
      { preview: 'Наезд на пешехода', value: 6 },
      { preview: 'Наезд на препятствие', value: 3 },
      { preview: 'Наезд на стоящее ТС', value: 7 },
      { preview: 'Опрокидывание', value: 4 },
      { preview: 'Отбрасывание предмета', value: 12 },
      { preview: 'Падение груза', value: 17 },
      { preview: 'Падение пассажира', value: 9 },
      { preview: 'Столкновение', value: 1 },
      { preview: 'Съезд с дороги', value: 2 },
    ],
  },
  {
    name: 'extra',
    key: 'street',
    label: 'Улицы',
    multiple: true,
    values: [],
  },
]
