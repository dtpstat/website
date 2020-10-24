import React from 'react'
import { types, flow, Instance } from 'mobx-state-tree'
// @ts-ignore
import makeInspectable from 'mobx-devtools-mst'

import { FilterStore } from './FilterStore'
import { MapStore } from './MapStore'
import { AreaStore } from './AreaStore'
import { TrafficAccidentStore } from './TrafficAccidentStore'
import { filtersData } from '../filtersData'

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
      const areaId = areaStore.area?.id
      if (!areaId) {
        // TODO clear filters?
        return
      }
      // yield filterStore.loadFiltersForArea(areaId)
      trafficAccidentStore.loadTrafficAccidents(filterStore.startDate, filterStore.endDate, bounds)
      yield areaStore.loadStatistics(center, zoom, filterStore.startDate, filterStore.endDate)
    })
    const drawObjects = () => {
      self.mapStore.drawObjects(self.trafficAccidentStore.accidents, self.filterStore.filters)
    }
    const onBoundsChanged = () => {
      load()
    }
    const onDatesChanged = () => {
      load()
    }
    const onTrafficAccidentsLoaded = () => {
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
    }
  })

export const rootStore = RootStore.create({
  filterStore: {},
  mapStore: {},
  areaStore: {},
  trafficAccidentStore: {},
})

rootStore.filterStore.setFilters(filtersData)

makeInspectable(rootStore)

export const RootStoreContext = React.createContext<typeof rootStore>(rootStore)

export function useStore() {
  const store = React.useContext(RootStoreContext)
  return store
}

// onPatch(rootStore, (patch) => {
//   console.log('Got change: ', patch)
// })

// onSnapshot(rootStore, (s) => {
//   console.log(s)
// })

// onAction(rootStore.mapStore, (call) => {
//   console.log(call)
// })

// onAction(rootStore.filterStore, (call) => {
//   console.log(call)
// })

// onAction(rootStore.areaStore, (call) => {
//   console.log(call)
// })

// onAction(rootStore.trafficAccidentStore, (call) => {
//   console.log(call)
// })

// autorun(() => {
//   console.log(
//     rootStore.filterStore.startDate,
//     rootStore.filterStore.endDate,
//     getSnapshot(rootStore.mapStore.bounds)
//   )
// })

// autorun(() => {
//   const { mapStore, filterStore, trafficAccidentStore } = rootStore
//   mapStore.drawObjects(trafficAccidentStore.accidents, getSnapshot(filterStore.filters))
// })

// autorun(() => {
//   const { mapStore, filterStore, trafficAccidentStore } = rootStore
//   if (mapStore.bounds.length > 0) {
//     trafficAccidentStore.loadTrafficAccidents(
//       filterStore.startDate,
//       filterStore.endDate,
//       getSnapshot(mapStore.bounds)
//     )
//   }
// })

// autorun(() => {
//   const { areaStore, mapStore } = rootStore
//   areaStore.loadArea(mapStore.center, mapStore.zoom || 0)
// })

// autorun(() => {
//   const { areaStore, filterStore, mapStore } = rootStore
//   // console.log(getSnapshot(mapStore))
//   if (mapStore.bounds.length > 0) {
//     areaStore.loadStatistics(
//       mapStore.center,
//       mapStore.zoom || 0,
//       filterStore.startDate,
//       filterStore.endDate
//     )
//   }
// })

// reaction(
//   () => ({
//     startDate: rootStore.filterStore.startDate,
//     endDate: rootStore.filterStore.endDate,
//     bounds: getSnapshot(rootStore.mapStore.bounds),
//   }),
//   ({ startDate, endDate, bounds }) => {
//     rootStore.trafficAccidentStore.loadTrafficAccidents(startDate, endDate, bounds)
//   },
//   { fireImmediately: true }
// )

// reaction(
//   () => ({
//     startDate: rootStore.filterStore.startDate,
//     endDate: rootStore.filterStore.endDate,
//     center: rootStore.mapStore.center,
//     scale: rootStore.mapStore.zoom,
//   }),
//   ({ startDate, endDate, center, scale }) => {
//     rootStore.areaStore.loadStatistics(center, scale || 0, startDate, endDate)
//   }
// )

// reaction(
//   () => ({
//     center: rootStore.mapStore.center,
//     scale: rootStore.mapStore.zoom,
//   }),
//   ({ center, scale }) => {
//     rootStore.areaStore.loadArea(center, scale || 0)
//   }
// )
