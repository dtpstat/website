import { types, Instance } from 'mobx-state-tree'

export const ExtraFilterValue = types
  .model('ExtraFilterValue', {
    preview: types.string,
    value: types.number,
    default: false,
    selected: false,
  })
  .actions((self) => {
    function changeSelection() {
      self.selected = !self.selected
    }
    return {
      changeSelection,
    }
  })

export const ExtraFilter = types.model('ExtraFilter', {
  name: types.literal('extra'),
  key: types.string,
  label: types.string,
  multiple: types.boolean,
  values: types.array(ExtraFilterValue),
})

export type ExtraFilterType = Instance<typeof ExtraFilter>
