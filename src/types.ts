export type Coordinate = number[];

export type Scale = number;

export type CoordinateObject = {
    longitude: number;
    latitude: number;
};

export type Bounds = Coordinate[];

export type BoundsChangedEvent = {
    originalEvent: {
        newCenter: Coordinate;
        newZoom: Scale;
        newBounds: Bounds;
    };
};

export type ShortStatisticsResponse = {
    parent_region_name: string;
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

export type DateFilterResponse = {
    name: 'date';
    label: string;
    values: string[];
    default_value: {
        start_date: string;
        end_date: string;
    };
};

export type ParticipantFilterValue = {
    preview: string;
    value: string;
    icon: string;
    default: boolean;
};

export type ParticipantFilterResponse = {
    name: 'participant_categories';
    label: string;
    multiple: boolean;
    values: ParticipantFilterValue[];
};

export type SeverityFilterValue = {
    preview: string;
    value: number;
    color: string;
    disabled: boolean;
    default: boolean;
};

export type SeverityFilterResponse = {
    name: 'severity';
    label: string;
    multiple: boolean;
    values: SeverityFilterValue[];
};

export type CategoryFilterValue = {
    preview: string;
    value: string;
};

export type CategoryFilterResponse = {
    name: 'category';
    label: string;
    multiple: boolean;
    values: CategoryFilterValue[];
};

export type FilterResponse =
    | DateFilterResponse
    | SeverityFilterResponse
    | ParticipantFilterResponse
    | CategoryFilterResponse;
