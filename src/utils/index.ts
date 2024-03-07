import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const isStrOrNotNaNNum = (value: any) => {
  return (typeof value === 'number' || typeof value === 'string') && !isNaN(value as number);
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
