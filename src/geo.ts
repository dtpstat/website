import { Bounds, Coordinate } from 'types'

export function buildGeoFrameFromBounds(bounds: Bounds) {
  if (bounds?.length !== 2 && bounds?.[0].length !== 2 && bounds?.[1].length !== 2) {
    return null
  }
  return [
    bounds[0],
    [bounds[1][0], bounds[0][1]],
    bounds[1],
    [bounds[0][0], bounds[1][1]],
    bounds[0],
  ]
}

export const containsBounds = (outer: Coordinate[], inner: Coordinate[]): boolean =>
  // @ts-ignore
  window.ymaps.util.bounds.containsBounds(outer, inner)

export const expandBounds = (bounds: Bounds): Bounds => {
  const w = bounds[1][0] - bounds[0][0]
  const h = bounds[1][1] - bounds[0][1]
  return [
    [bounds[0][0] - w, bounds[0][1] - h],
    [bounds[1][0] + w, bounds[1][1] + h],
  ]
}
