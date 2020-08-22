import config from 'config';

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
    ).then(response => response.json());
}
