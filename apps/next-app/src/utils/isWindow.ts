export function isWindow<T>(value: T | [(...v: any) => any, any]) {
    if(Array.isArray(value)) {
        const [fn, v] = value

        return typeof window !== 'undefined' ? fn(v) as T : null;
    }
    return typeof window !== 'undefined' ? value : null;
}