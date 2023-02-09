import moment from 'moment';

export interface EntryInstance {
  id: number; // timesstamp + random number
  entryTypeId: string;

  createdAt: number;
  updatedAt: number;

  points: number;
  notes: string;
}

export enum RoutineEnum {
  daily = 'DAILY',
  weekly = 'WEEKLY',
  monthly = 'MONTHLY',
  none = 'NONE',
}

export interface EntryType {
  id: string;
  title: string;

  defaultPoints: number;
  pointStep: number;

  // when not completed in a cycle, deduct default points
  routine: RoutineEnum;

  createdAt: number;
  updatedAt: number;

  themeColors: string[];
}

export const EntryTypeConstructor = ({
  id = '',
  title = '',
  defaultPoints = 0,
  pointStep = 0,
  routine = RoutineEnum.none,
  themeColors = ['#000000'],
}) => {
  const now = +new Date();
  return {
    updatedAt: now,
    createdAt: now,
    title,
    id,
    defaultPoints,
    pointStep,
    routine,
    themeColors,
  } as EntryType;
};

export class EntryDay {
  year: number = -1;
  month: -1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = -1;
  day:
    | -1
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31 = -1;

  entryInstanceIds: number[] = [];
}

export const PAGES = ['entry', 'add', 'reminder', 'settings'];

export const EntryTypeThemeColors = [
  ['FF5912', 'FC3650'],
  ['FC8D3C', 'FF5912'],
  ['FCA53C', 'FF8812'],
  ['FFCF26', 'F9A709'],

  ['89D365', '09BDA0'],
  ['09BDA0', '3E90FF'],
  ['3592FF', '6865FF'],
  ['6865FF', '9E3EEF'],
];

export class DiaryGlobalStats {
  registrationSince: number = -1;
  entryDays: number = -1;

  historicalLongestStreakByEntry: number = -1;
  currentStreakByentry: number = -1;

  totalEntries: number = -1;
}

export const formatDatetime = (datetime: number | null) =>
  datetime ? moment(datetime).format('hh:mm:ss a | ddd DD MMM YYYY') : '';
export const formatDate = (datetime: number | null) => (datetime ? moment(datetime).format('ddd DD MMM YYYY') : '');

export const getEntryTypeIds = (entryTypes: EntryType[]) => entryTypes.map((entryType) => entryType.id);
