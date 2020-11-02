import { flow, types, getParent } from 'mobx-state-tree'

import { fetchDtp } from 'api'
import { Bounds } from 'types'

export const TrafficAccidentStore = types
  .model('TrafficAccidentStore', {
    accidents: types.frozen([]),
  })
  .actions((self) => {
    // @ts-ignore
    const loadTrafficAccidents = flow(function* loadTrafficAccidents(
      startDate: string,
      endDate: string,
      bounds: Bounds
    ) {
      try {
        const response = yield fetchDtp(startDate, endDate, bounds)
        self.accidents = response
        // @ts-ignore
        getParent(self).onTrafficAccidentsLoaded()
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error
        }
      }
    })
    return {
      loadTrafficAccidents,
    }
  })
