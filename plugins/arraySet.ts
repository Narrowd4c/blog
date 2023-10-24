export default defineNuxtPlugin(() => {
  return {
    provide: {
          arraySet: (arr: any[]) => Array.from(new Set(arr))
    }
  }
})