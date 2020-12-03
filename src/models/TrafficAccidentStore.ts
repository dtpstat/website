import { flow, types, getRoot } from 'mobx-state-tree'

import { fetchDtp } from 'api'

import { RootStoreType } from './RootStore'

const getYears = (startDate: string, endDate: string) => {
  const result = []
  const start = parseInt(startDate.split('-')[0])
  const end = parseInt(endDate.split('-')[0])
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export const TrafficAccidentStore = types
  .model({
    accs: types.frozen([]),
  })
  .actions((self) => {
    const loadTrafficAccidents = flow(function* loadTrafficAccidents(
      startDate: string,
      endDate: string,
      region: string
    ) {
      const root = getRoot<RootStoreType>(self)
      root.incLoading()
      try {
        const data = yield fetchDtp(getYears(startDate, endDate), region)
        self.accs = data
          .flat()
          .filter((a: any) => a.point && a.datetime >= startDate && a.datetime <= endDate) // TODO point
        root.onTrafficAccidentsLoaded()
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error
        }
      } finally {
        root.decLoading()
      }
    })
    return {
      loadTrafficAccidents,
    }
  })
