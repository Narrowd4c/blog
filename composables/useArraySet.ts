export const useArraySet = () => {
    const arraySet = (arr: any[]) => Array.from(new Set(arr))
    return arraySet
}
