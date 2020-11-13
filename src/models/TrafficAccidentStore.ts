import { flow, types, getRoot } from 'mobx-state-tree'
import union from '@turf/union'
import bboxPolygon from '@turf/bbox-polygon'
import booleanContains from '@turf/boolean-contains'
import transformScale from '@turf/transform-scale'
import { BBox, Feature, Polygon, MultiPolygon, polygon } from '@turf/helpers'

import { fetchDtp } from 'api'
import { LOADING_ZOOM } from 'utils'
import { Bounds } from 'types'

import { RootStoreType } from './RootStore'

const bboxFromBounds = (bounds: Bounds): BBox => [
  bounds[0][0],
  bounds[0][1],
  bounds[1][0],
  bounds[1][1],
]

const featureContains = (f1: Feature<MultiPolygon | Polygon>, f2: Feature<Polygon>): boolean => {
  switch (f1.geometry.type) {
    case 'Polygon':
      return booleanContains(f1, f2)
    case 'MultiPolygon':
      for (let p of f1.geometry.coordinates) {
        if (booleanContains(polygon(p), f2)) {
          return true
        }
      }
  }
  return false
}

export const TrafficAccidentStore = types.model({}).actions((self) => {
  let loadedArea: Feature<MultiPolygon | Polygon> | null = null
  let abortController: AbortController | null = null

  // @ts-ignore
  const loadTrafficAccidents = flow(function* loadTrafficAccidents(
    startDate: string,
    endDate: string,
    bounds: Bounds,
    zoom: number
  ) {
    if (zoom < LOADING_ZOOM) {
      abortController?.abort()
      return
    }
    const boundsPolygon = bboxPolygon(bboxFromBounds(bounds))
    if (loadedArea && featureContains(loadedArea, boundsPolygon)) {
      return
    }
    abortController?.abort()
    abortController = new window.AbortController()
    const newBoundsPolygon = transformScale(boundsPolygon, 3)
    const root = getRoot<RootStoreType>(self)
    root.incLoading()
    try {
      const response = yield fetchDtp(
        abortController.signal,
        startDate,
        endDate,
        newBoundsPolygon.geometry.coordinates[0]
      )
      root.onTrafficAccidentsLoaded(response)
      if (loadedArea) {
        loadedArea = union(loadedArea, newBoundsPolygon)
      } else {
        loadedArea = newBoundsPolygon
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        throw error
      }
    } finally {
      root.decLoading()
    }
  })
  const clearLoadedArea = () => {
    loadedArea = null
  }
  return {
    loadTrafficAccidents,
    clearLoadedArea,
  }
})
