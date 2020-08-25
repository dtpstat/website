import config from 'config';
import { buildGeoFrameFromTwoPoints } from 'geo';

export function fetchArea(center, scale) {
    return fetch(
        `${config.API_URL}/stat/?center_point=${center[1]}+${center[0]}&scale=${scale}`,
    ).then((response) => response.json());
}

export function fetchFilters(id) {
    return fetch(
        `${config.API_URL}/filters/?region_slug=${id}`,
    ).then((response) => response.json());
}

export function fetchStatistics(center, scale, startDate, endDate) {
    return fetch(
        `${config.API_URL}/stat/?center_point=${center[1]}+${center[0]}&scale=${scale}&start_date=${startDate}&end_date=${endDate}`,
    ).then((response) => response.json());
}

export function fetchDtp(startDate, endDate, bounds) {
    const frame = buildGeoFrameFromTwoPoints(bounds);
    if (!frame) {
        // TODO log error
        return null;
    }
    const boundsStr = frame.map((coord) => `${coord[0]} ${coord[1]}`).join(',');
    return fetch(
        `${config.API_URL}/dtp/?start_date=${startDate}&end_date=${endDate}&geo_frame=${boundsStr}`,
    ).then((response) => response.json());
}
