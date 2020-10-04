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

export enum FilterType {
  CATEGORY = 'category',
  SEVERITY = 'severity',
  PARTICIPANT_CATEGORIES = 'participant_categories',
  DATE = 'date',
}

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

export type DateFilterResponse = {
  name: 'date'
  label: string
  values: string[]
  default_value: {
    start_date: string
    end_date: string
  }
}
interface ParticipantsFilterBase {
  name: 'participant_categories'
  label: string
  multiple: boolean
}

export interface ParticipantFilterResponseValue {
  preview: string
  value: number
  icon: string
  default: boolean
}

export type ParticipantFilterResponse = ParticipantsFilterBase & {
  values: ParticipantFilterResponseValue[]
}

export type ParticipantFilterValue = ParticipantFilterResponseValue & {
  selected: boolean
  changeSelection(): void
}

export type ParticipantFilter = ParticipantsFilterBase & {
  values: ParticipantFilterValue[]
}

interface SeverityFilterBase {
  name: 'severity'
  label: string
  multiple: boolean
}

export interface SeverityFilterResponseValue {
  preview: string
  value: number
  color: string
  disabled: boolean
  default: boolean
}

export type SeverityFilterValue = SeverityFilterResponseValue & {
  selected: boolean
  changeSelection(): void
}
//
// export type SeverityFilterResponse = SeverityFilterBase & {
//   values: SeverityFilterResponseValue[]
// }

export type SeverityFilter = SeverityFilterBase & {
  values: SeverityFilterValue[]
}

export type CategoryFilterValue = {
  preview: string
  value: number
}

export type CategoryFilterResponse = {
  name: 'category'
  label: string
  multiple: boolean
  values: CategoryFilterValue[]
}

export type FilterResponse =
  | DateFilterResponse
  | SeverityFilter
  | ParticipantFilter
  | CategoryFilterResponse
