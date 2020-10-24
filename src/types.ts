export type Coordinate = number[]

export type Scale = number

export type CoordinateObject = {
  longitude: number
  latitude: number
}

export type Bounds = Coordinate[]

export type BoundsChangedEvent = {
  originalEvent: {
    newCenter: Coordinate
    newZoom: Scale
    newBounds: Bounds
  }
}

// export enum FilterType {
//   CATEGORY = 'category',
//   SEVERITY = 'severity',
//   PARTICIPANT_CATEGORIES = 'participant_categories',
//   DATE = 'date',
// }

export type ShortStatisticsResponse = {
  parent_region_name: string
  region_name: string
  region_slug: string
}

export type DetailedStatisticsResponse = {
  parent_region_name: string
  region_name: string
  region_slug: string
  count: number
  injured: number
  dead: number
}

export type FilterResponse =
  | DateFilterResponse
  | SeverityFilterResponse
  | ParticipantsFilterResponse
  | ExtraFilterResponse

export type DateFilterResponse = {
  name: 'date'
  label: string
  values: string[]
  default_value: {
    start_date: string
    end_date: string
  }
}

export type ParticipantsFilterResponse = {
  name: 'participant_categories'
  label: string
  multiple: boolean
  values: ParticipantFilterResponseValue[]
}

export type SeverityFilterResponse = {
  name: 'severity'
  label: string
  multiple: boolean
  values: SeverityFilterResponseValue[]
}

export type ExtraFilterResponse = {
  name: 'extra'
  key: string
  label: string
  multiple: boolean
  values: ExtraFilterResponseValue[]
}

export type ParticipantFilterResponseValue = {
  preview: string
  value: number
  icon: string
  default: boolean
}

export type SeverityFilterResponseValue = {
  preview: string
  value: number
  color: string
  disabled: boolean
  default: boolean
}

export interface ExtraFilterResponseValue {
  preview: string
  value: number
  default: boolean
}
