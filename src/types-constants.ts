export class EntryInstance {
  id: number = -1;
  entryTypeId: number = -1;

  createdAt: number = -1;
  updatedAt: number = -1;

  points: number = -1;
  notes: string = '';
}

export enum RoutineEnum {
  daily = 'DAILY',
  weekly = 'WEEKLY',
  monthly = 'MONTHLY',
  none = 'NONE',
}

export class EntryType {
  constructor({
    id = -1,
    title = '',
    defaultPoints = 0,
    pointStep = 0,
    routine = RoutineEnum.none,
    themeColor = '#000000',
  }) {
    this.updatedAt = this.createdAt = +new Date();

    this.id = id;
    this.title = title;
    this.defaultPoints = defaultPoints;
    this.pointStep = pointStep;
    this.routine = routine;
    this.themeColor = themeColor;
  }

  id: number = -1;
  title: string = '';

  defaultPoints: number = 0;
  pointStep: number = 0;

  // when not completed in a cycle, deduct default points
  routine: RoutineEnum = RoutineEnum.none;

  createdAt: number = -1;
  updatedAt: number = -1;

  themeColor: string = '#000000';
}

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

export class LoginUser {
  uid: string = '';
}

export type SetLoginUser = (user: LoginUser | null) => void | null;

export const saveLoginUser = (user: LoginUser | null, setLoginUser: SetLoginUser) => {
  if (user) {
    localStorage.setItem('loginUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('loginUser');
  }
  setLoginUser(user);
};

export const loadLoginUser = (setLoginUser: SetLoginUser) => {
  const loginUserJson = localStorage.getItem('loginUser');
  if (loginUserJson) {
    const user = JSON.parse(loginUserJson);
    setLoginUser(user);
  }
};
