import { selectEntryInstancesMap, useAppSelector } from '@/app/store';
import { EntryType, RoutineEnum, StreakStatus } from '@/app/types-constants';
import dayjs from 'dayjs';
import { useCallback } from 'react';

export const useEntryStreakGetters = (routine: RoutineEnum) => {
  const entryInstancesMap = useAppSelector(selectEntryInstancesMap);
  const getHeader = useCallback(
    ({ start, end }: { start: string; end: string }) => {
      const s = dayjs(start);
      const e = dayjs(end);
      if (routine === RoutineEnum.daily) return e.format('MMM\nDD');
      else if (routine === RoutineEnum.weekly) return `${s.format('MMM DD')}-${e.format('MMM DD')}`;
      else if (routine === RoutineEnum.monthly) return e.format('MMM');
    },
    [routine],
  );
  const getStatus = useCallback(
    (period: { start: string; end: string }, entryType: EntryType, isLatest?: boolean): StreakStatus => {
      const { id, createdAt } = entryType;
      const { start, end } = period;
      const createAt = dayjs(createdAt);
      const s = dayjs(start);
      const e = dayjs(end);
      switch (routine) {
        case RoutineEnum.daily: {
          // s~e 这一天有过一次就是胜利
          if (createAt.isAfter(e)) return StreakStatus.UNCREATED;
          const entries = entryInstancesMap[s.format('YYYY-MM-DD')];
          if (!entries?.length) return isLatest ? StreakStatus.WARNING : StreakStatus.INCOMPLETE;
          const isDone = entries.findIndex(({ entryTypeId }) => entryTypeId === id) !== -1;
          if (isDone) return StreakStatus.COMPLETED;
          else return isLatest ? StreakStatus.WARNING : StreakStatus.INCOMPLETE;
        }
        case RoutineEnum.weekly: {
          // s~e 这一周有过一次就是胜利
          if (createAt.isAfter(e)) return StreakStatus.UNCREATED;
          for (let day = s; day.isBefore(e) || day.isSame(e); day = day.add(1, 'day')) {
            const entries = entryInstancesMap[day.format('YYYY-MM-DD')];
            if (entries?.length && entries.findIndex(({ entryTypeId }) => entryTypeId === id) !== -1) {
              return StreakStatus.COMPLETED;
            }
          }
          return isLatest ? StreakStatus.WARNING : StreakStatus.INCOMPLETE;
        }
        case RoutineEnum.monthly: {
          // s~e 这一月有过一次就是胜利
          if (createAt.isAfter(e)) return StreakStatus.UNCREATED;
          for (let day = s; day.isBefore(e) || day.isSame(e); day = day.add(1, 'day')) {
            const entries = entryInstancesMap[day.format('YYYY-MM-DD')];
            if (entries?.length && entries.findIndex(({ entryTypeId }) => entryTypeId === id) !== -1) {
              return StreakStatus.COMPLETED;
            }
          }
          return isLatest ? StreakStatus.WARNING : StreakStatus.INCOMPLETE;
        }
        default:
          return StreakStatus.UNCREATED;
      }
    },
    [entryInstancesMap, routine],
  );
  return {
    getHeader,
    getStatus,
  };
};
