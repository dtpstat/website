import React from 'react'
import { types, flow, Instance } from 'mobx-state-tree'
// @ts-ignore
import makeInspectable from 'mobx-devtools-mst'

import { FilterStore } from './FilterStore'
import { MapStore } from './MapStore'
import { AreaStore } from './AreaStore'
import { TrafficAccidentStore } from './TrafficAccidentStore'

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
    const loadData = flow(function* () {
      const { center, zoom, bounds } = self.mapStore

      const currentParams = new URLSearchParams(document.location.search)
      currentParams.set('center', `${center[0]}:${center[1]}`)
      currentParams.set('scale', String(zoom))
      window.history.pushState(null, '', `?${currentParams.toString()}`)

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
      loadData()
    }
    const onDatesChanged = () => {
      self.mapStore.clearObjects()
      self.trafficAccidentStore.clearLoadedArea()
      loadData()
    }
    const onTrafficAccidentsLoaded = (accidents: any[]) => {
      self.mapStore.addObjects(accidents)
      self.filterStore.updateStreets(accidents)
    }
    const onFiltersChanged = () => {
      self.mapStore.updateFilter(self.filterStore.filters.slice()) // Array.isArray should be true
    }
    const incLoading = () => {
      self.loadingCount += 1
    }
    const decLoading = () => {
      self.loadingCount -= 1
    }
    return {
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

rootStore.filterStore.loadFilters()

export const RootStoreContext = React.createContext<typeof rootStore>(rootStore)

export function useStore() {
  const store = React.useContext(RootStoreContext)
  return store
}
