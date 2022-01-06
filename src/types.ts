import type { MapState as YMapState } from "react-yandex-maps";

export type Coordinate = NonNullable<YMapState["center"]>;

export type MapState = {
  center: Coordinate;
  zoom: NonNullable<YMapState["zoom"]>;
};

export interface Comment {
  id: number;
  text: string;
  user?: string;
  avatarUrl?: string;
  date: string;
}

export type ShortStatisticsResponse = {
  parentRegionName: string;
  parentRegionSlug: string;
  regionName: string;
  regionSlug: string;
};

export type DetailedStatisticsResponse = {
  parentRegionName: string;
  regionName: string;
  regionSlug: string;
  count: number;
  injured: number;
  dead: number;
};

export type FilterResponse =
  | DateFilterResponse
  | SeverityFilterResponse
  | ParticipantsFilterResponse
  | CategoryFilterResponse;

export type DateFilterResponse = {
  name: "date";
  label: string;
  values: string[];
  defaultValue: {
    startDate: string;
    endDate: string;
  };
};

export type ParticipantsFilterResponse = {
  name: "participant_categories";
  label: string;
  multiple: boolean;
  values: ParticipantFilterResponseValue[];
};

export type SeverityFilterResponse = {
  name: "severity";
  label: string;
  multiple: boolean;
  values: SeverityFilterResponseValue[];
};

export type CategoryFilterResponse = {
  name: "category";
  key: string;
  label: string;
  multiple: boolean;
  values: CategoryFilterResponseValue[];
};

export type ParticipantFilterResponseValue = {
  preview: string;
  value: number;
  icon: string;
  default: boolean;
};

export type SeverityFilterResponseValue = {
  preview: string;
  value: number;
  color: string;
  disabled: boolean;
  default: boolean;
};

export interface CategoryFilterResponseValue {
  preview: string;
  value: number;
  default: boolean;
}
