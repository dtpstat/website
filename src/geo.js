export function buildGeoFrameFromTwoPoints(bounds) {
    if (
        bounds?.length !== 2 &&
        bounds?.[0].length !== 2 &&
        bounds?.[1].length !== 2
    ) {
        return null;
    }
    return [
        bounds[0],
        [bounds[1][0], bounds[0][1]],
        bounds[1],
        [bounds[0][0], bounds[1][1]],
        bounds[0],
    ];
}
