/**
 * Checks if the provided array is non-empty.
 * 
 * @param arr - The array to check.
 * @returns A boolean indicating if the array is non-empty.
 */

export function isNonEmptyArray<T>(arr: T[]): boolean {
  return Array.isArray(arr) && arr.length > 0;
}


export const getApiUrl = (day: number) => {
  return `https://api.nytimes.com/svc/mostpopular/v2/viewed/${day}.json`
}
