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

export const barLowValue = 8;
export const barHighValue = 16;
export const barLowColor = '#990000';
export const barHighColor = '#006600';
export const chartColorPanel = [
  'rgba(242,122,119,1)',
  'rgba(119,242,122,1)',
  'rgba(122,119,242,1)',
  'rgba(249,145,87,1)',
  'rgba(249,87,145,1)',
  'rgba(145,249,87,1)',
  'rgba(145,87,249,1)',
  'rgba(87,249,145,1)',
  'rgba(87,145,249,1)',
  'rgba(240,192,96,1)',
  'rgba(240,96,192,1)',
  'rgba(192,240,96,1)',
  'rgba(192,96,240,1)',
  'rgba(96,240,192,1)',
  'rgba(96,192,240,1)',
  'rgba(144,192,144,1)',
  'rgba(144,144,192,1)',
  'rgba(192,144,144,1)',
  'rgba(96,192,192,1)',
  'rgba(192,96,192,1)',
  'rgba(192,192,96,1)',
  'rgba(96,144,192,1)',
  'rgba(96,192,144,1)',
  'rgba(144,96,192,1)',
  'rgba(144,192,96,1)',
  'rgba(192,96,144,1)',
  'rgba(192,144,96,1)',
  'rgba(192,144,192,1)',
  'rgba(192,192,144,1)',
  'rgba(144,192,192,1)',
  'rgba(210,123,83,1)',
  'rgba(210,83,123,1)',
  'rgba(123,210,83,1)',
  'rgba(123,83,210,1)',
  'rgba(83,210,123,1)',
  'rgba(83,123,210,1)',
];
export const stringHashCode = (s: string) => {
  let hash = 0;
  if (s.length === 0) {
    return hash;
  }
  for (let i = 0; i < s.length; i++) {
    const chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
export const setOpacity = (s: string, a: number) => {
  return s.substring(0, s.lastIndexOf(',') + 1) + a + ')';
};
export const isNumOrStrAndNotNaN = (a: any) => {
  return (typeof a == 'number' || typeof a == 'string') && !isNaN(a as number);
};

export class DiaryGlobalStats {
  registedSince: number = -1;
  entryDays: number = -1;

  historicalLongestStreakByEntry: number = -1;
  currentStreakByentry: number = -1;

  totalEntries: number = -1;
}

export const formatDatetime = (datetime: number | null) =>
  datetime ? moment(datetime).format('h:mm:ssa | ddd YYYY-MMM-DD') : '';
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
export const getDatetimeStringFromTimestampShortFormat = (timestamp: number) => {
  const m = moment(timestamp);
  // month is 0-indexed. maybe easier to index in an array [Jan, Feb, Mar, ...]
  // same goes for day of week
  return m.format('YYYYMMDD-hhmmss');
};
export const getDatetimeStringFromTimestamp = (timestamp: number) => {
  const m = moment(timestamp);
  // month is 0-indexed. maybe easier to index in an array [Jan, Feb, Mar, ...]
  // same goes for day of week
  return m.format('YYYY-MM-DD-hh-mm-ss');
};

export const getDateStringFromNow = () => getDateStringFromTimestamp(+new Date());
export const getDatetimeStringFromNow = () => getDateStringFromTimestamp(+new Date());
export const getDatetimeStringShortFormatFromNow = () => getDatetimeStringFromTimestampShortFormat(+new Date());

export const getEntryInstanceIdFromEntryType = (entryType: EntryType) => {
  return `${entryType.id}-${new Date().toISOString()}-${Math.floor(Math.random() * 120)}`;
};
