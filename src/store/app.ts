import { atom } from 'jotai';

export const selectedChartDateAtom = atom<string | null>(null);

export const loadDialogOpenAtom = atom<boolean>(false);
