import moment from 'moment';

export interface EntryInstance {
  id: string; // timesstamp + random number
  entryTypeId: string;

  createdAt: number;
  updatedAt: number;

  points: number;
  notes: string;
}

export enum RoutineEnum {
  daily = 'Daily',
  weekly = 'Weekly',
  monthly = 'Monthly',
  adhoc = 'Adhoc',
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
  routine = RoutineEnum.adhoc,
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

export type Year = number;
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
// eslint-disable-next-line prettier/prettier
export type Day =
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
  | 31;
export type DiaryDate = { year: Year; month: Month; day: Day };

export interface EntryDay extends DiaryDate {
  entryInstanceIds: string[];
  totalPoints: number;
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
  datetime ? moment(datetime).format('h:mm:ssa | YYYY-MM-DD ddd') : '';
export const formatDate = (datetime: number | null) => (datetime ? moment(datetime).format('ddd DD MMM YYYY') : '');

export const getDateStringFromEntryDay = (entryDay: EntryDay) => {
  const { year, month, day } = entryDay;
  return `${year}-${month}-${day}`;
};

export const getDateStringFromTimestamp = (timestamp: number) => {
  const m = moment(timestamp);
  // month is 0-indexed. maybe easier to index in an array [Jan, Feb, Mar, ...]
  // same goes for day of week
  return m.format('YYYY-MM-DD');
};
export const getDateStringFromNow = () => getDateStringFromTimestamp(+new Date());

export const getEntryInstanceIdFromEntryType = (entryType: EntryType) => {
  return `${entryType.id}-${new Date().toISOString()}-${Math.floor(Math.random() * 120)}`;
};
