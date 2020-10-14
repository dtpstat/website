import React from 'react'
import { types, flow } from 'mobx-state-tree'
// @ts-ignore
import makeInspectable from 'mobx-devtools-mst'

import { Bounds, Coordinate, Scale } from 'types'

import { FilterStore } from './FilterStore'
import { MapStore } from './MapStore'
import { AreaStore } from './AreaStore'
import { TrafficAccidentStore } from './TrafficAccidentStore'

const RootModel = types
  .model('RootModel', {
    filterStore: FilterStore,
    mapStore: MapStore,
    areaStore: AreaStore,
    trafficAccidentStore: TrafficAccidentStore,
  })
  .actions(function (self) {
    const onBoundsChanged = flow(function* onBoundsChanged(
      center: Coordinate,
      scale: Scale,
      bounds: Bounds
    ) {
      window.history.pushState(null, '', `?center=${center[0]}:${center[1]}&scale=${scale}`)
      const { areaStore, filterStore, trafficAccidentStore } = self
      yield areaStore.loadArea(center, scale)
      const areaId = areaStore.area?.id
      if (!areaId) {
        // TODO clear filters?
        return
      }
      yield filterStore.loadFiltersForArea(areaId)
      trafficAccidentStore.loadTrafficAccidents(filterStore.startDate, filterStore.endDate, bounds)
      yield areaStore.loadStatistics(center, scale, filterStore.startDate, filterStore.endDate)
    })

    const onTrafficAccidentsLoaded = (accidents: any) => {
      self.mapStore.drawObjects(accidents)
    }

    return {
      onBoundsChanged,
      onTrafficAccidentsLoaded,
    }
  })

export const rootStore = RootModel.create({
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
