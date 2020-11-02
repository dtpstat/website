import config from 'config'
import { buildGeoFrameFromTwoPoints } from 'geo'
import {
  Coordinate,
  Scale,
  Bounds,
  ShortStatisticsResponse,
  DetailedStatisticsResponse,
  FilterResponse,
} from 'types'

export const fetchArea = (center: Coordinate, scale: Scale): Promise<ShortStatisticsResponse> =>
  fetch(
    `${config.API_URL}/stat/?center_point=${center[1]}+${center[0]}&scale=${scale}`
  ).then((response) => response.json())

export const fetchFilters = (): Promise<FilterResponse[]> =>
  fetch(`${config.API_URL}/filters`).then((response) => response.json())

export const fetchStatistics = (
  center: Coordinate,
  scale: Scale,
  startDate: string,
  endDate: string
): Promise<DetailedStatisticsResponse> =>
  fetch(
    `${config.API_URL}/stat/?center_point=${center[1]}+${center[0]}&scale=${scale}&start_date=${startDate}&end_date=${endDate}`
  ).then((response) => response.json())

let dtpController: AbortController | null = null

export function fetchDtp(startDate: string, endDate: string, bounds: Bounds) {
  dtpController?.abort()
  const frame = buildGeoFrameFromTwoPoints(bounds)
  if (!frame) {
    // TODO log error
    return null
  }
  const boundsStr = frame.map((coord) => `${coord[1]} ${coord[0]}`).join(',')
  dtpController = new AbortController()
  return fetch(
    `${config.API_URL}/dtp/?start_date=${startDate}&end_date=${endDate}&geo_frame=${boundsStr}`,
    { signal: dtpController.signal }
  ).then((response) => response.json())
}
