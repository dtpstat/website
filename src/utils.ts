export const LOADING_ZOOM = 11

export function debounce(func: Function, wait: number, immediate: boolean = false) {
  let timeout: any = null
  return function () {
    // @ts-ignore
    const context = this,
      args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export const isEmpty = (obj: Object) => Object.keys(obj).length === 0

// export const buildGeoFrameFromBounds = (bounds: Bounds) => [
//   bounds[0],
//   [bounds[1][0], bounds[0][1]],
//   bounds[1],
//   [bounds[0][0], bounds[1][1]],
//   bounds[0],
// ]

// export const containsBounds = (outer: Bounds, inner: Bounds): boolean =>
//   // @ts-ignore
//   window.ymaps.util.bounds.containsBounds(outer, inner)

// export const expandBounds = (bounds: Bounds): Bounds => {
//   const w = bounds[1][0] - bounds[0][0]
//   const h = bounds[1][1] - bounds[0][1]
//   return [
//     [bounds[0][0] - w, bounds[0][1] - h],
//     [bounds[1][0] + w, bounds[1][1] + h],
//   ]
// }
