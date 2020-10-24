import { flow, types } from 'mobx-state-tree'

import { fetchArea, fetchStatistics } from 'api'
import { Coordinate, Scale } from 'types'
import { isEmpty } from 'functions'

const Area = types.model('Area', {
  id: types.string,
  name: types.string,
  parentName: types.maybeNull(types.string),
})

const AreaStatistics = types.model('AreaStatistics', {
  count: types.number,
  injured: types.number,
  dead: types.number,
})

export const AreaStore = types
  .model('AreaStore', {
    area: types.maybeNull(Area),
    statistics: types.maybeNull(AreaStatistics),
  })
  .actions((self) => {
    const clear = () => {
      self.area = null
      self.statistics = null
    }

    const loadArea = flow(function* (center: Coordinate, scale: Scale) {
      const response = yield fetchArea(center, scale)
      if (isEmpty(response)) {
        return
      }
      const newArea = Area.create({
        id: response.region_slug,
        name: response.region_name,
        parentName: response.parent_region_name,
      })
      if (self.area?.id !== newArea.id) {
        self.statistics = null
      }
      self.area = newArea
    })

    const loadStatistics = flow(function* loadStatistics(
      center: Coordinate,
      scale: Scale,
      startDate: string,
      endDate: string
    ) {
      const response = yield fetchStatistics(center, scale, startDate, endDate)
      self.statistics = AreaStatistics.create({
        count: response.count,
        injured: response.injured,
        dead: response.dead,
      })
    })

    return {
      clear,
      loadArea,
      loadStatistics,
    }
  })
