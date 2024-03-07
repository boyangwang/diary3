import dayjs from 'dayjs';
import { atom } from 'jotai';

export const selectedChartDateAtom = atom<string | null>(null);

export const loadDialogOpenAtom = atom<boolean>(false);

export type GlobalState = {
  registeredSince: number;
  entryDays: number;
  totalEntries: number;
  historicalLongestStreakByEntry: number;
  currentStreakByEntry: number;
};
export const globalStateAtom = atom<GlobalState | null>(null);

export const chartDateRangeAtom = atom<string[]>([]);
