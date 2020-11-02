import { types, flow, cast, Instance } from 'mobx-state-tree'

import { fetchFilters } from 'api'

import { DateFilter, DateFilterType } from './filters/DateFilter'
import { ParticipantsFilter } from './filters/ParticipantsFilter'
import { SeverityFilter } from './filters/SeverityFilter'
import { RegionFilter } from './filters/RegionFilter'
import { CategoryFilter } from './filters/CategoryFilter'

const Filter = types.union(
  ParticipantsFilter,
  DateFilter,
  SeverityFilter,
  RegionFilter,
  CategoryFilter
)

export type FilterType = Instance<typeof Filter>

function convertFilter(filter: any): any {
  switch (filter.name) {
    case 'date':
      return DateFilter.create(filter)
    case 'participant_categories':
      return ParticipantsFilter.create(filter)
    case 'severity':
      return SeverityFilter.create(filter)
    case 'region':
      return RegionFilter.create(filter)
    case 'category':
      return CategoryFilter.create(filter)
  }
}

export const FilterStore = types
  .model('FilterStore', {
    filters: types.array(
      types.union(ParticipantsFilter, DateFilter, SeverityFilter, RegionFilter, CategoryFilter)
    ),
    visible: true,
    search: '',
    currentKey: types.maybeNull(types.string),
  })
  .actions((self) => {
    function setFilters(filters: any[]) {
      self.filters.clear()
      self.filters = cast(filters.map(convertFilter)) || []
    }
    // const updateStreets = (accidents: any[]) => {
    //   if (accidents) {
    //     const streetFilter = self.filters.find((f: any) => f.key === 'street') as CategoryFilterType
    //     if (streetFilter) {
    //       const streets = accidents
    //         .filter((a) => a.address)
    //         .map((a) => a.address.split(',')[1].trim())
    //       streetFilter.values = cast(
    //         streets.map((s, i) => CategoryFilterValue.create({ preview: s, value: i }))
    //       )
    //     }
    //   }
    // }
    const loadFilters = flow(function* loadFiltersForArea() {
      const response = yield fetchFilters()
      setFilters(response)
    })
    const setCurrentKey = (key: string) => {
      self.currentKey = key
    }
    const setVisible = (visible: boolean) => {
      self.visible = visible
    }
    const setSearch = (s: string) => {
      self.search = s
    }
    return {
      setFilters,
      // updateStreets,
      loadFilters,
      setCurrentKey,
      setVisible,
      setSearch,
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
