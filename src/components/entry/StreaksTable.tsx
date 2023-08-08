import { selectEntryInstancesMap, useAppSelector } from '@/app/store';
import clsx from 'clsx';
import dayjs from 'dayjs';
import _ from 'lodash-es';
import { Fragment, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { EntryType, RoutineEnum, StreakStatus, getDatePeriods } from '../../app/types-constants';
import { calcEntryTypeLongestStreaks } from '@/utils/entry';
import EntryTypeCard from './EntryTypeCard';
import { useEntryStreakGetters } from '@/hooks/entryType';

const statusColor: { [key in StreakStatus]: string } = {
  [StreakStatus.UNCREATED]: 'bg-white/80',
  [StreakStatus.COMPLETED]: 'bg-green-500',
  [StreakStatus.INCOMPLETE]: 'bg-red-500',
  [StreakStatus.WARNING]: 'bg-orange-500',
};
function StreaksTable(props: { entryTypesArray: EntryType[]; routine: RoutineEnum }) {
  const { routine, entryTypesArray } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const entryInstancesMap = useAppSelector(selectEntryInstancesMap);
  const periods = useMemo(() => getDatePeriods(routine), [routine]);
  const entryTypeMaxStreaks = useMemo(
    () => calcEntryTypeLongestStreaks(entryInstancesMap, routine),
    [entryInstancesMap, routine],
  );
  const filterEntryTypes = useMemo(() => {
    const routineTypes = entryTypesArray.filter((item) => item.routine === routine);
    routineTypes.sort((a: EntryType, b: EntryType) => {
      // 先按照连胜,从多到少 streak 相同的,就 defaultPoints 从高到底排序
      const maxA = entryTypeMaxStreaks?.[a.id] ?? 0;
      const maxB = entryTypeMaxStreaks?.[b.id] ?? 0;
      if (maxA > maxB) return -1;
      else if (maxA < maxB) return 1;
      else {
        return a.defaultPoints > b.defaultPoints ? -1 : 1;
      }
    });
    return routineTypes;
  }, [entryTypeMaxStreaks, entryTypesArray, routine]);

  const { getStatus, getHeader } = useEntryStreakGetters(routine);

  const historyLongestArr = useMemo(() => {
    if (!filterEntryTypes?.length || !periods?.length) return [];
    return filterEntryTypes.map((item) => entryTypeMaxStreaks?.[item.id] ?? 0);
  }, [entryTypeMaxStreaks, filterEntryTypes, periods?.length]);

  const adhocSumArr = useMemo(
    () =>
      filterEntryTypes.map((item) => {
        let sum = 0;
        for (const entryInsArrKey in entryInstancesMap) {
          if (Object.hasOwn(entryInstancesMap, entryInsArrKey)) {
            const entryInsArr = entryInstancesMap[entryInsArrKey];
            for (const entryIns of entryInsArr) {
              if (entryIns.entryTypeId === item.id) sum++;
            }
          }
        }
        return (
          <div className="flex h-10 items-center justify-center text-xl" key={item.id}>
            {sum}
          </div>
        );
      }),
    [entryInstancesMap, filterEntryTypes],
  );

  const streakArr = useMemo(() => {
    return filterEntryTypes.map((item, idx) => (
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
              <div key={`streakCell-${idx}`} className={clsx('h-10 w-14 min-w-[3.5rem] flex-grow', statusColor[status])} />
            );
          })}
        </div>
      </Fragment>
    ));
  }, [filterEntryTypes, getHeader, getStatus, periods]);

  useLayoutEffect(() => {
    if (!scrollContainerRef?.current) return;
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.scrollTo({
      left: scrollContainer.scrollWidth,
      behavior: 'smooth',
    });
  }, []);
  if (!periods.length)
    return (
      <div className="flex w-full flex-col gap-2">
        <h2>{`${routine} Streaks Table`}</h2>
        <div className="flex justify-center gap-3">
          <div className="flex max-w-xl flex-grow flex-col gap-2">
            {filterEntryTypes.map((item) => (
              <EntryTypeCard key={item.id} entryType={item} isEdit className="h-10 w-full" />
            ))}
          </div>
          <div className="flex flex-col gap-2 font-DDin font-bold">{adhocSumArr}</div>
        </div>
      </div>
    );
  return (
    <div className="flex w-full flex-col gap-2">
      <h2>{`${routine} Streaks Table`}</h2>
      <div className={clsx('flex w-full gap-1', { '-mt-6': routine !== RoutineEnum.weekly })}>
        <div className="mt-11 flex flex-col gap-1">
          {filterEntryTypes.map((item) => (
            <EntryTypeCard key={item.id} entryType={item} isEdit className="h-10" />
          ))}
        </div>
        <div ref={scrollContainerRef} className="flex w-full flex-col gap-1 overflow-auto scroll-smooth">
          {streakArr}
        </div>
        <div className="mt-11 flex flex-col items-center gap-1">
          {historyLongestArr.map((value, idx) => (
            <div className="h-10 w-6 text-xs" key={`${value}-${idx}`}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StreaksTable;
