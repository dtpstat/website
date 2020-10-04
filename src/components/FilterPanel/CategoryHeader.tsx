import { observer } from 'mobx-react'
import React from 'react'

const CategoryHeader = () => (
  <div className='filter-header'>
    <button className='btn-back'>
      <svg className='icon icon-arrow-back'>
        <use xlinkHref='svg/sprite.svg#arrow-back' />
      </svg>
      <span>Нарушения ПДД</span>
    </button>
    <div className='tags-wrap'>
      <div className='category-tag-light' tabIndex={0}>
        <button className='btn-light'>
          <span>Превышение скорости</span>
          <svg className='icon icon-decline'>
            <use xlinkHref='svg/sprite.svg#decline' />
          </svg>
        </button>
      </div>
      <div className='category-tag-light' tabIndex={0}>
        <button className='btn-light'>
          <span>Нет прав</span>
          <svg className='icon icon-decline'>
            <use xlinkHref='svg/sprite.svg#decline' />
          </svg>
        </button>
      </div>
      <div className='category-tag-light' tabIndex={0}>
        <button className='btn-light'>
          <span>Превышение скорости</span>
          <svg className='icon icon-decline'>
            <use xlinkHref='svg/sprite.svg#decline' />
          </svg>
        </button>
      </div>
    </div>

    <div className='inputWrap'>
      <input type='text' className='input' placeholder='Введите название нарушения' />
      {/* maybe it should be button not just svg */}
      <button className='btn-search'>
        <svg className='icon icon-search'>
          <use xlinkHref='svg/sprite.svg#search' />
        </svg>
      </button>
    </div>
  </div>
)

export default observer(CategoryHeader)
