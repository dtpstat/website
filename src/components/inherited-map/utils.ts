export const POINTS_ZOOM = 12;

// export function debounce(func: (Function), wait: number, immediate: boolean = false) {
//   let timeout: any = null
//   return function () {
//     // @ts-ignore WIP: figure out and fix @ts-ignore
//     const context = this,
//       args = arguments
//     const later = function () {
//       timeout = null
//       if (!immediate) func.apply(context, args)
//     }
//     let callNow = immediate && !timeout
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//     if (callNow) func.apply(context, args)
//   }
// }

export type AnyEmptyObject = Record<string, unknown>;

export const isEmpty = (obj: AnyEmptyObject) => Object.keys(obj).length === 0;

export const resultFromApiResult = (
  apiResult: AnyEmptyObject,
  keyFromApiKey: AnyEmptyObject,
) =>
  Object.fromEntries(
    Object.entries(apiResult).map(([apiKey, v]) => [keyFromApiKey[apiKey], v]),
  );
