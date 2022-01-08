export type Coordinate = number[];

export type ShortStatisticsResponse = {
  parent_region_name: string;
  parent_region_slug: string;
  region_name: string;
  region_slug: string;
};

export type DetailedStatisticsResponse = {
  parent_region_name: string;
  region_name: string;
  region_slug: string;
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
  default_value: {
    start_date: string;
    end_date: string;
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
