import { selectEntryInstancesMap, useAppSelector } from '@/app/store';
import clsx from 'clsx';
import dayjs from 'dayjs';
import _ from 'lodash-es';
import { Fragment, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { EntryType, RoutineEnum, StreakStatus, getDatePeriods } from '../../app/types-constants';
import { calcEntryTypeLongestStreaks } from '@/utils/entry';

const statusColor: { [key in StreakStatus]: string } = {
  [StreakStatus.UNCREATED]: 'bg-white/80',
  [StreakStatus.COMPLETED]: 'bg-green-500',
  [StreakStatus.INCOMPLETE]: 'bg-red-500',
  [StreakStatus.WARNING]: 'bg-orange-500',
};
function StreaksTable(props: { entryTypesArray: EntryType[]; routine: RoutineEnum }) {
  const { routine, entryTypesArray } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const filterEntryTypes = useMemo(
    () => entryTypesArray.filter((item) => item.routine === routine),
    [entryTypesArray, routine],
  );
  const entryInstancesMap = useAppSelector(selectEntryInstancesMap);
  const periods = useMemo(() => getDatePeriods(routine), [routine]);
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
  const historyLongestArr = useMemo(() => {
    if (!filterEntryTypes?.length || !periods?.length) return [];
    return filterEntryTypes.map((item) => calcEntryTypeLongestStreaks(item, entryInstancesMap));
  }, [entryInstancesMap, filterEntryTypes, periods?.length]);

  useLayoutEffect(() => {
    if (!scrollContainerRef?.current) return;
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.scrollTo({
      left: scrollContainer.scrollWidth,
      behavior: 'smooth',
    });
  }, []);

  // console.log(routine, periods, { filterEntryTypes, entryInstancesMap });
  if (!periods.length)
    return (
      <div className="flex w-full flex-col gap-2">
        <h2>{`${routine} Streaks Table`}</h2>
        <div className="flex flex-col gap-2">
          {filterEntryTypes.map((item) => (
            <div className="flex text-center text-xs" key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="flex w-full flex-col gap-2">
      <h2>{`${routine} Streaks Table`}</h2>
      <div className={clsx('flex w-full gap-1', { '-mt-6': routine !== RoutineEnum.weekly })}>
        <div className="mt-11 flex flex-col items-center gap-1">
          {filterEntryTypes.map((item) => (
            <div
              className="flex h-6 w-[5rem] items-center overflow-hidden text-ellipsis whitespace-nowrap text-xs"
              key={item.id}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div ref={scrollContainerRef} className="flex w-full flex-col gap-1 overflow-auto scroll-smooth">
          {filterEntryTypes.map((item, idx) => (
            <Fragment key={item.id}>
              {idx === 0 && (
                <div className="flex w-full gap-1">
                  {periods.map((period, idx) => (
                    <div
                      key={`header${period.start}${idx}`}
                      className="flex h-10 min-w-[3.5rem] flex-grow items-end justify-center text-center text-sm"
                    >
                      {getHeader(period)}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex w-full gap-1">
                {periods.map((period, idx) => {
                  const status = getStatus(period, item, idx === periods.length - 1);
                  return (
                    <div key={`streakCell-${idx}`} className={clsx('h-6 w-14 min-w-[3.5rem] flex-grow', statusColor[status])} />
                  );
                })}
              </div>
            </Fragment>
          ))}
        </div>
        <div className="mt-11 flex flex-col items-center gap-1">
          {historyLongestArr.map((value, idx) => (
            <div className="h-6 w-6 text-xs" key={`${value}-${idx}`}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StreaksTable;
