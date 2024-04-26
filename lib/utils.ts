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
