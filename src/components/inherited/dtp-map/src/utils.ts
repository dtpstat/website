export const POINTS_ZOOM = 12;

export function debounce(
  func: Function,
  wait: number,
  immediate: boolean = false,
) {
  let timeout: any = null;

  return function () {
    // @ts-ignore
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

export const isEmpty = (obj: Object) => Object.keys(obj).length === 0;
