import { types } from 'mobx-state-tree'

const SeverityItem = types
  .model('SeverityItem', {
    preview: types.string,
    value: types.number,
    color: types.string,
    disabled: types.boolean,
    default: types.boolean,
    selected: types.optional(types.boolean, false),
  })
  .actions((self) => {
    function changeSelection() {
      self.selected = !self.selected
    }
    return {
      changeSelection,
    }
  })

export const SeverityFilter = types.model('SeverityFilter', {
  name: types.literal('severity'),
  label: types.string,
  multiple: types.boolean,
  values: types.array(SeverityItem),
})
