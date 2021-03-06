import { djangoBaseUrl } from "../../shared/django-helpers";
import { Coordinate, FilterResponse, ShortStatisticsResponse } from "./types";

export const fetchFilters = (): Promise<FilterResponse[]> =>
  fetch(`${djangoBaseUrl}/api/filters`).then((response) => response.json());

let areaController: AbortController | null;

export const fetchArea = (
  center: Coordinate,
  zoom: number,
): Promise<ShortStatisticsResponse> => {
  areaController?.abort();
  areaController = new AbortController();

  return fetch(
    `${djangoBaseUrl}/api/stat/?center_point=${center[0]!}+${center[1]!}&scale=${zoom}`,
    {
      signal: areaController.signal,
    },
  ).then((response) => {
    return response.json();
  });
};

const cache: any = {};

const fetchDtpYear = (signal: AbortSignal, year: number, region: string) => {
  const result = cache[region]?.[year];
  if (result) {
    return Promise.resolve(result);
  }

  return fetch(
    `${djangoBaseUrl}/api/dtp_load/?year=${year}&region_slug=${region}&format=json`,
    {
      signal,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      if (!cache[region]) {
        cache[region] = {};
      }
      cache[region][year] = data;

      return data;
    });
};

let dtpController: AbortController | null;

export const fetchDtp = (years: number[], region: string) => {
  dtpController?.abort();
  dtpController = new AbortController();

  return Promise.all(
    years.map((y) => fetchDtpYear(dtpController!.signal, y, region)),
  );
};
