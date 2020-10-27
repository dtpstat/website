import { types, Instance, getRoot } from 'mobx-state-tree'

import { RootStoreType } from '../RootStore'

export const CategoryFilterValue = types
  .model('CategoryFilterValue', {
    preview: types.string,
    value: types.number,
    default: false,
    selected: false,
  })
  .actions((self) => {
    const toggle = () => {
      self.selected = !self.selected
      getRoot<RootStoreType>(self).onFiltersChanged()
    }
    const reset = () => {
      self.selected = self.default
    }
    return {
      toggle,
      reset,
    }
  })

export const CategoryFilter = types
  .model('CategoryFilter', {
    name: types.literal('category'),
    key: types.string,
    label: types.string,
    multiple: types.boolean,
    values: types.array(CategoryFilterValue),
  })
  .actions((self) => ({
    reset() {
      self.values.forEach((v) => v.reset())
      getRoot<RootStoreType>(self).onFiltersChanged()
    },
    navigate() {
      getRoot<RootStoreType>(self).filterStore.setCurrentKey(self.key)
    },
  }))

export type ExtraFilterType = Instance<typeof CategoryFilter>
