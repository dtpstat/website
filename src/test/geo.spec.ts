import { buildGeoFrameFromTwoPoints } from 'geo'

test('buildGeoFrameFromTwoPoints should return valid frame for two points array', () => {
  const bounds = [
    [36.51, 50.55],
    [36.65, 50.63],
  ]
  const frame = [
    [36.51, 50.55],
    [36.65, 50.55],
    [36.65, 50.63],
    [36.51, 50.63],
    [36.51, 50.55],
  ]
  expect(buildGeoFrameFromTwoPoints(bounds)).toEqual(frame)
})
