/**
 * Checks if the provided array is non-empty.
 * 
 * @param arr - The array to check.
 * @returns A boolean indicating if the array is non-empty.
 */

export function isNonEmptyArray<T>(arr: T[]): boolean {
    return Array.isArray(arr) && arr.length > 0;
  }
  