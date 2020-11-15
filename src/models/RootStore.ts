import React from 'react'
import { types, flow, Instance } from 'mobx-state-tree'
// @ts-ignore
import makeInspectable from 'mobx-devtools-mst'

import { FilterStore } from './FilterStore'
import { MapStore } from './MapStore'
import { AreaStore } from './AreaStore'
import { TrafficAccidentStore } from './TrafficAccidentStore'
import { DateFilterType } from './filters/DateFilter'

export type RootStoreType = Instance<typeof RootStore>

const RootStore = types
  .model('RootStore', {
    filterStore: FilterStore,
    mapStore: MapStore,
    areaStore: AreaStore,
    trafficAccidentStore: TrafficAccidentStore,
    loadingCount: 0,
  })
  .actions((self) => {
    const afterCreate = flow(function* () {
      yield self.filterStore.loadFilters()
      setDatesFromUrl()
      setFiltersFromUrl()
    })
    const loadData = flow(function* () {
      const { center, zoom, bounds } = self.mapStore
      const { areaStore, filterStore, trafficAccidentStore } = self
      yield areaStore.loadArea(center, zoom)
      yield trafficAccidentStore.loadTrafficAccidents(
        filterStore.startDate,
        filterStore.endDate,
        bounds,
        zoom
      )
      yield areaStore.loadStatistics(center, zoom, filterStore.startDate, filterStore.endDate)
    })
    const onBoundsChanged = () => {
      updateUrlMap()
      loadData()
    }
    const onDatesChanged = () => {
      updateUrlDates()
      self.mapStore.clearObjects()
      self.trafficAccidentStore.clearLoadedArea()
      loadData()
    }
    const onTrafficAccidentsLoaded = (accidents: any[]) => {
      self.filterStore.updateStreets(accidents)
      setStreetsFromUrl()
      self.mapStore.updateFilter(self.filterStore.filters.slice()) // for first load
      self.mapStore.addObjects(accidents)
    }
    const onFiltersChanged = () => {
      updateUrlFilters()
      self.mapStore.updateFilter(self.filterStore.filters.slice()) // Array.isArray should be true
    }
    const incLoading = () => {
      self.loadingCount += 1
    }
    const decLoading = () => {
      self.loadingCount -= 1
    }
    const updateUrlMap = () => {
      const { center, zoom } = self.mapStore
      const currentParams = new URLSearchParams(document.location.search)
      currentParams.set('center', `${center[0]}:${center[1]}`)
      currentParams.set('scale', String(zoom))
      window.history.pushState(null, '', `?${currentParams.toString()}`)
    }
    const updateUrlDates = () => {
      const value = (self.filterStore.filters.find((f) => f.name === 'date') as DateFilterType)
        .value
      const currentParams = new URLSearchParams(document.location.search)
      currentParams.set('start_date', value.start_date)
      currentParams.set('end_date', value.end_date)
      window.history.pushState(null, '', `?${currentParams.toString()}`)
    }
    const updateUrlFilters = () => {
      const currentParams = new URLSearchParams(document.location.search)
      self.filterStore.filters
        .filter((f) => f.name !== 'date')
        .forEach((f: any) => {
          const id = f.key || f.name
          currentParams.delete(id)
          const values = f.values.filter((v: any) => v.selected)
          if (values.length > 0) {
            currentParams.set(
              id,
              values.map((v: any) => (id === 'street' ? v.preview : String(v.value))).join(';')
            )
          }
        })
      window.history.pushState(null, '', `?${currentParams.toString()}`)
    }
    const setDatesFromUrl = () => {
      const currentParams = new URLSearchParams(document.location.search)
      const dateFilter = self.filterStore.filters.find((f) => f.name === 'date') as DateFilterType
      const start_date = currentParams.get('start_date')
      const end_date = currentParams.get('end_date')
      if (start_date && end_date) {
        dateFilter.value = { start_date, end_date }
      }
    }
    const setFiltersFromUrl = () => {
      const currentParams = new URLSearchParams(document.location.search)
      self.filterStore.filters
        .filter((f) => f.name !== 'date')
        .forEach((f: any) => {
          const id = f.key || f.name
          const value = currentParams.get(id)
          if (value) {
            const values = value.split(';')
            f.values.forEach((fv: any) => {
              const s = id === 'street' ? fv.preview : String(fv.value)
              fv.selected = values.includes(s)
            })
          }
        })
    }
    const setStreetsFromUrl = () => {
      const currentParams = new URLSearchParams(document.location.search)
      const streetFilter: any = self.filterStore.filters.find((f: any) => f.key === 'street')
      const value = currentParams.get('street')
      if (value) {
        const values = value.split(';')
        streetFilter.values.forEach((fv: any) => {
          fv.selected = values.includes(fv.preview)
        })
      }
    }
    return {
      afterCreate,
      onBoundsChanged,
      onTrafficAccidentsLoaded,
      onDatesChanged,
      onFiltersChanged,
      incLoading,
      decLoading,
    }
  })

export const rootStore = RootStore.create({
  filterStore: {},
  mapStore: {},
  areaStore: {},
  trafficAccidentStore: {},
})

makeInspectable(rootStore)

export const RootStoreContext = React.createContext<typeof rootStore>(rootStore)

export function useStore() {
  const store = React.useContext(RootStoreContext)
  return store
}
