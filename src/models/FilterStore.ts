import { types, flow, cast } from 'mobx-state-tree'

import { fetchFilters } from 'api'

import { DateFilter, DateFilterType } from './filters/DateFilter'
import { CategoryFilter } from './filters/CategoryFilter'
import { SeverityFilter } from './filters/SeverityFilter'
import { ParticipantsFilter } from './filters/ParticipantsFilter'

function convertFilter(filter: any): any {
  switch (filter.name) {
    case 'date':
      return DateFilter.create(filter)
    case 'participant_categories':
      return ParticipantsFilter.create(filter)
    case 'severity':
      return SeverityFilter.create(filter)
    case 'category':
      return CategoryFilter.create(filter)
  }
}

export const FilterStore = types
  .model('FilterModel', {
    filters: types.array(
      types.union(ParticipantsFilter, DateFilter, SeverityFilter, CategoryFilter)
    ),
  })
  .actions((self) => {
    function setFilters(filters: any[]) {
      self.filters.clear()
      self.filters = cast(filters.map(convertFilter)) || []
    }

    const loadFiltersForArea = flow(function* loadFiltersForArea(id: string) {
      const response = yield fetchFilters(id)
      setFilters(response)
    })
    return {
      loadFiltersForArea,
    }
  })
  .views((self) => ({
    get date() {
      const dateFilters = self.filters.filter((f) => f.name === 'date') as DateFilterType[]
      return dateFilters?.[0]
    },

    get startDate() {
      return this.date?.default_value.start_date
    },

    get endDate() {
      return this.date?.default_value.end_date
    },
  }))
