import dayjs from 'dayjs';

export interface EntryInstance {
  id: string; // timestamp + random number
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

export enum StreakStatus {
  UNCREATED = 'uncreated',
  INCOMPLETE = 'incomplete',
  COMPLETED = 'completed',
  WARNING = 'warning', // 本周期还未完成 快失败了
}

export const EntryTypeConstructor = ({
  id = '',
  title = '',
  defaultPoints = 0,
  pointStep = 0,
  routine = RoutineEnum.adhoc,
  themeColors = ['#000000'],
}) => {
  const now = Number(new Date());
  return {
    updatedAt: now,
    createdAt: now,
    title,
    id,
    defaultPoints,
    pointStep,
    routine,
    themeColors,
  } satisfies EntryType;
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
export interface DiaryDate {
  year: Year;
  month: Month;
  day: Day;
}

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

  ['FDEB71', 'F8D800'],
  ['ABDCFF', '0396FF'],
  ['FEB692', 'EA5455'],
  ['CE9FFC', '7367F0'],

  ['90F7EC', '32CCBC'],
  ['FFF6B7', 'F6416C'],
  ['81FBB8', '28C76F'],
  ['E2B0FF', '9F44D3'],

  ['5EFCE8', '736EFE'],
  ['FAD7A1', 'E96D71'],
  ['FEC163', 'DE4313'],
  ['FFF886', 'F072B6'],

  ['FFF720', '3CD500'],
  ['FDD819', 'E80505'],
  ['FFDDE1', 'EE9CA7'],
  ['6190E8', 'A7BFE8'],
];

export type DateRange = 'day' | 'week' | 'month';
export const barLowValue: { [key: string]: number } = { day: 8, week: 16, month: 32 };
export const barHighValue: { [key: string]: number } = { day: 16, week: 32, month: 64 };
export const barLowColor = '#990000';
export const barHighColor = '#006600';
export const isNumOrStrAndNotNaN = (a: any) => {
  return (typeof a === 'number' || typeof a === 'string') && !isNaN(a as number);
};

export const getDateStringFromEntryDay = (entryDay: EntryDay) => {
  const { year, month, day } = entryDay;
  return `${year}-${month}-${day}`;
};

export const getDateStringFromTimestamp = (timestamp: number) => {
  const m = dayjs(timestamp);
  // month is 0-indexed. maybe easier to index in an array [Jan, Feb, Mar, ...]
  // same goes for day of week
  return m.format('YYYY-MM-DD');
};
export const getDatetimeStringFromTimestampShortFormat = (timestamp: number) => {
  const m = dayjs(timestamp);
  // month is 0-indexed. maybe easier to index in an array [Jan, Feb, Mar, ...]
  // same goes for day of week
  return m.format('YYYYMMDD-hhmmss');
};
export const getDatetimeStringFromTimestamp = (timestamp: number) => {
  const m = dayjs(timestamp);
  // month is 0-indexed. maybe easier to index in an array [Jan, Feb, Mar, ...]
  // same goes for day of week
  return m.format('YYYY-MM-DD-hh-mm-ss');
};

export const getDateStringFromNow = () => getDateStringFromTimestamp(Number(new Date()));
export const getDatetimeStringFromNow = () => getDateStringFromTimestamp(Number(new Date()));
export const getDatetimeStringShortFormatFromNow = () => getDatetimeStringFromTimestampShortFormat(Number(new Date()));

export const getEntryInstanceIdFromEntryType = (entryType: EntryType, date = dayjs()) => {
  return `${entryType.id}-${date.toISOString()}-${Math.floor(Math.random() * 120)}`;
};
export const getDatePeriods = (type: RoutineEnum, cycle = 7) => {
  if (type === RoutineEnum.adhoc) return [];
  let dayType = {
    [RoutineEnum.daily]: 'day',
    [RoutineEnum.weekly]: 'week',
    [RoutineEnum.monthly]: 'month',
  };
  const t = dayType[type] as 'day' | 'week' | 'month';
  const nowDate = dayjs();
  const periods = [];
  for (let i = 0; i < cycle; i++) {
    const start = nowDate.subtract(i, t).startOf(t).format('YYYY-MM-DD HH:mm:ss');
    const end = nowDate.subtract(i, t).endOf(t).format('YYYY-MM-DD HH:mm:ss');
    periods.unshift({ start, end });
  }
  return periods;
};

export enum ReminderType {
  weekly = 'Weekly',
  monthly = 'Monthly',
  annual = 'Annual',
  since = 'Since',
}

export type ReminderRecord = {
  id: string;
  title: string;
  content?: string;
  type: ReminderType;
  // ReminderPushConfig;
  weekDay?: number; // ReminderType.weekly 0~6 星期里的第几天
  monthDay?: number; // ReminderType.monthly 月份里的几号 0～31
  month?: number; // ReminderType.annual 年里的第几月进行提醒 0～11
  sinceStartTime?: number; // ReminderType.since 从什么时候开始记录
  isSendReminderEmail?: boolean;

  createdAt: number;
  updatedAt: number;
};
export const ReminderConstructor = ({
  id,
  title = '',
  type = ReminderType.weekly,
  createdAt,
  updatedAt,
  ...rest
}: Partial<ReminderRecord>): ReminderRecord => {
  const now = dayjs();
  const uniqueId = `${now.toISOString()}_${Math.random().toString(36).substring(2, 9)}`;
  return {
    id: id ?? uniqueId,
    title,
    type,
    ...rest,
    updatedAt: createdAt ?? now.valueOf(),
    createdAt: updatedAt ?? now.valueOf(),
  };
};
