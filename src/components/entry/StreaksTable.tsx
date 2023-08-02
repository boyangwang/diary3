import { selectEntryInstancesMap, useAppSelector } from '@/app/store';
import clsx from 'clsx';
import dayjs from 'dayjs';
import _ from 'lodash-es';
import { Fragment, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { EntryType, RoutineEnum, getDatePeriods } from '../../app/types-constants';

const tempColor = ['bg-green-500', 'bg-red-500'];
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
  useLayoutEffect(() => {
    if (!scrollContainerRef?.current) return;
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.scrollTo({
      left: scrollContainer.scrollWidth,
      behavior: 'smooth', // 设置滚动行为为平滑
    });
  }, []);

  console.log(routine, periods, { filterEntryTypes, entryInstancesMap });
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
        <div className="mt-12 flex flex-col items-center gap-1">
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
                <div className="flex w-fit gap-1">
                  {periods.map((item, idx) => (
                    <div
                      key={`header${item.start}${idx}`}
                      className="flex h-12 w-14 items-end justify-center text-center text-sm"
                    >
                      {getHeader(item)}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex w-fit gap-1">
                {periods.map((v, idx) => (
                  <div key={idx} className={clsx('h-6 w-14', tempColor[_.random(0, 1)])} />
                ))}
              </div>
            </Fragment>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-1">
          {filterEntryTypes.map((item) => (
            <div className="h-6 w-6 text-xs" key={item.id}>
              6
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StreaksTable;
