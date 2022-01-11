import { buildGeoFrameFromBounds, expandBounds } from "geo";

import { Bounds } from "../types";

test("buildGeoFrameFromBounds should return valid frame for two points array", () => {
  const bounds: Bounds = [
    [36.51, 50.55],
    [36.65, 50.63],
  ];
  const frame = [
    [36.51, 50.55],
    [36.65, 50.55],
    [36.65, 50.63],
    [36.51, 50.63],
    [36.51, 50.55],
  ];
  expect(buildGeoFrameFromBounds(bounds)).toEqual(frame);
});

test("expandBounds", () => {
  const bounds: Bounds = [
    [10, 10],
    [20, 15],
  ];
  const bounds2 = [
    [0, 5],
    [30, 20],
  ];
  expect(expandBounds(bounds)).toEqual(bounds2);
});
