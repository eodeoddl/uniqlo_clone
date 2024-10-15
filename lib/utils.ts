import { ImageType } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isKeyOf<T extends Record<PropertyKey, unknown>>(
  key: PropertyKey,
  obj: T
): key is keyof T {
  return key in obj;
}

/**
 * /components/search.tsx 에서 사용
 * ui 배치를 위해 데이터를 나누기위해 필요한 함수들 => [splitDataIntoColumns, findIndexOfShortestArray, calculateColumns]
 * @param data
 * @param numColumns
 * @returns
 */

export function splitDataIntoColumns<T>(data: T[], numColumns: number): T[][] {
  const columns: T[][] = Array.from({ length: numColumns }, () => []);
  data.forEach((item, index) => {
    columns[index % numColumns].push(item);
  });
  return columns;
}

export const findIndexOfShortestArray = (array: ImageType[][]) => {
  if (array.length === 0) return -1;

  let minLength = array[0].length;
  let minIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i].length < minLength) {
      minLength = array[i].length;
      minIndex = i;
    }
  }

  return minIndex;
};

export const calculateColumns = (width: number): number => {
  if (width < 640) return 1;
  if (width < 768) return 2;
  return 3;
};
