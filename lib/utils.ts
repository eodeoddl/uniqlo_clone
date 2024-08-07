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

export function splitDataIntoColumns<T>(data: T[], numColumns: number): T[][] {
  const columns: T[][] = Array.from({ length: numColumns }, () => []);
  data.forEach((item, index) => {
    columns[index % numColumns].push(item);
  });
  return columns;
}
