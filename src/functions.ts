export function debounce(func: Function, wait: number, immediate: boolean = false) {
    let timeout: any = null;
    return function () {
        // @ts-ignore
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export function isEmpty(obj: Object) {
    return Object.keys(obj).length === 0;
}
