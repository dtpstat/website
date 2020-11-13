import { flow, types, getRoot } from 'mobx-state-tree'

import { fetchDtp } from 'api'
import { Bounds } from 'types'

import { RootStoreType } from './RootStore'

export const TrafficAccidentStore = types.model('TrafficAccidentStore', {}).actions((self) => {
  // @ts-ignore
  const loadTrafficAccidents = flow(function* loadTrafficAccidents(
    startDate: string,
    endDate: string,
    bounds: Bounds,
    zoom: number
  ) {
    if (zoom >= 11) {
      const root = getRoot<RootStoreType>(self)
      try {
        root.incLoading()
        const response = yield fetchDtp(startDate, endDate, bounds)
        root.onTrafficAccidentsLoaded(response)
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error
        }
      } finally {
        root.decLoading()
      }
    }
  })
  return {
    loadTrafficAccidents,
  }
})
