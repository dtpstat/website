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
  })
  .actions((self) => {
    const load = flow(function* () {
      const { center, zoom, bounds } = self.mapStore
      window.history.pushState(null, '', `?center=${center[0]}:${center[1]}&scale=${zoom}`)
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
    const drawObjects = () => {
      self.mapStore.drawObjects(
        self.trafficAccidentStore.accidents,
        self.filterStore.filters.slice() // Array.isArray should be true
      )
    }
    const updateStreets = () => {
      self.filterStore.updateStreets(self.trafficAccidentStore.accidents)
    }
    const onBoundsChanged = () => {
      load()
    }
    const onDatesChanged = () => {
      load()
    }
    const onTrafficAccidentsLoaded = () => {
      updateStreets()
      drawObjects()
    }
    const onFiltersChanged = () => {
      drawObjects()
    }
    return {
      onBoundsChanged,
      onTrafficAccidentsLoaded,
      onDatesChanged,
      onFiltersChanged,
      updateStreets,
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
