import { types, flow, cast, Instance } from 'mobx-state-tree'

import { fetchFilters } from 'api'

import { DateFilter, DateFilterType } from './filters/DateFilter'
import { ParticipantsFilter } from './filters/ParticipantsFilter'
import { SeverityFilter } from './filters/SeverityFilter'
import { ExtraFilter, ExtraFilterType, ExtraFilterValue } from './filters/ExtraFilter'

const Filter = types.union(ParticipantsFilter, DateFilter, SeverityFilter, ExtraFilter)

export type FilterType = Instance<typeof Filter>

function convertFilter(filter: any): any {
  switch (filter.name) {
    case 'date':
      return DateFilter.create(filter)
    case 'participant_categories':
      return ParticipantsFilter.create(filter)
    case 'severity':
      return SeverityFilter.create(filter)
    default:
      return ExtraFilter.create(filter)
  }
}

export const FilterStore = types
  .model('FilterStore', {
    filters: types.array(types.union(ParticipantsFilter, DateFilter, SeverityFilter, ExtraFilter)),
  })
  .actions((self) => {
    function setFilters(filters: any[]) {
      self.filters.clear()
      self.filters = cast(filters.map(convertFilter)) || []
    }
    const updateStreets = (accidents: any[]) => {
      if (accidents) {
        const streetFilter = self.filters.find((f: any) => f.key === 'street') as ExtraFilterType
        if (streetFilter) {
          const streets = accidents
            .filter((a) => a.address)
            .map((a) => a.address.split(',')[1].trim())
          streetFilter.values = cast(
            streets.map((s, i) => ExtraFilterValue.create({ preview: s, value: i }))
          )
        }
      }
    }
    const loadFiltersForArea = flow(function* loadFiltersForArea(id: string) {
      const response = yield fetchFilters(id)
      setFilters(response)
    })
    return {
      setFilters,
      updateStreets,
      loadFiltersForArea,
    }
  })
  .views((self) => ({
    get date() {
      const dateFilters = self.filters.filter((f) => f.name === 'date') as DateFilterType[]
      return dateFilters?.[0]
    },

    get startDate() {
      return this.date?.value.start_date
    },

    get endDate() {
      return this.date?.value.end_date
    },
  }))
