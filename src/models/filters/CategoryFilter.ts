import { types } from 'mobx-state-tree'

const CategoryItem = types.model('CategoryItem', {
  preview: types.string,
  value: types.number,
})

export const CategoryFilter = types.model('CategoryFilter', {
  name: types.literal('category'),
  label: types.string,
  multiple: types.boolean,
  values: types.array(CategoryItem),
})
