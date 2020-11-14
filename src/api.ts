import config from 'config'
import {
  Coordinate,
  DetailedStatisticsResponse,
  FilterResponse,
  Scale,
  ShortStatisticsResponse,
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

export const fetchDtp = (
  // eslint-disable-next-line no-undef
  signal: AbortSignal,
  startDate: string,
  endDate: string,
  geoFrame: Coordinate[]
) => {
  const s = geoFrame.map((coord) => `${coord[1]} ${coord[0]}`).join(',')
  return fetch(
    `${config.API_URL}/dtp/?start_date=${startDate}&end_date=${endDate}&geo_frame=${s}`,
    {
      signal,
    }
  ).then((response) =>
    response.json().then((json) => {
      if (response.ok) {
        return Promise.resolve(json)
      }
      return Promise.reject(json)
    })
  )
}
