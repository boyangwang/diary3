import { selectEntryInstancesMap, selectEntryTypesArray, useAppSelector } from '@/app/store';
import { useInput } from '@/hooks/useInput';
import { sortEntryTypesArray } from '@/utils/entry';
import { useMemo, useState } from 'react';
import EntryTypeCard from './EntryTypeCard';
import Segmented from '../segmented';
import { RoutineEnum } from '@/app/types-constants';

const options = [
  {
    label: 'All',
    value: 'all',
  },
  { value: RoutineEnum.daily },
  { value: RoutineEnum.weekly },
  { value: RoutineEnum.monthly },
  { value: RoutineEnum.adhoc },
];
const EntryTypeListForCompletion = ({ selectedDateStr }: { selectedDateStr: string }) => {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);
  const entryInstancesMap = useAppSelector(selectEntryInstancesMap);
  const { inputValue, onInputChange } = useInput();
  const [segmentedValue, setSegmentedValue] = useState<'all' | RoutineEnum>('all');
  const { doneList, restList } = useMemo(() => {
    const todayEntryInstances = entryInstancesMap[selectedDateStr];
    let doneEntryTypes = new Set(todayEntryInstances?.length ? todayEntryInstances.map(({ entryTypeId }) => entryTypeId) : []);
    return {
      restList: sortEntryTypesArray(
        entryTypesArray.filter(({ id, title, routine }) => {
          const isNotDone = doneEntryTypes?.size ? !doneEntryTypes.has(id) : true;
          const isInRoutine = segmentedValue === 'all' ? true : routine === segmentedValue;
          if (!isNotDone || !isInRoutine) return false;
          if (inputValue) {
            const idStr = id.toLowerCase();
            const titleStr = title.toLowerCase();
            const filterStr = inputValue.toLowerCase();
            return idStr.includes(filterStr) || titleStr.includes(filterStr);
          }
          return true;
        }),
        entryInstancesMap,
      ),
      doneList: doneEntryTypes?.size
        ? sortEntryTypesArray(
            entryTypesArray.filter(({ id }) => doneEntryTypes.has(id)),
            entryInstancesMap,
          )
        : [],
    };
  }, [entryInstancesMap, entryTypesArray, inputValue, segmentedValue, selectedDateStr]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 bg-gradient p-2 text-white">
        <div className="flex items-center justify-center gap-2">
          filterStr:
          <input className="border bg-transparent p-2" value={inputValue} onChange={onInputChange} />
        </div>
        <Segmented
          defaultValue={segmentedValue}
          onChange={(value) => setSegmentedValue(value as 'all' | RoutineEnum)}
          options={options}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1 4xl:grid-cols-4">
        {restList?.length
          ? restList.map((item) => (
              <EntryTypeCard key={item.id} entryType={item} isEdit={false} selectedDayStr={selectedDateStr} />
            ))
          : null}
      </div>
      <div className="mt-4 flex items-center justify-center border-t pt-2 text-xl font-semibold">Today Done List</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1 4xl:grid-cols-4">
        {doneList?.length
          ? doneList.map((item) => (
              <EntryTypeCard key={item.id} isDone entryType={item} isEdit={false} selectedDayStr={selectedDateStr} />
            ))
          : null}
      </div>
    </div>
  );
};

export default EntryTypeListForCompletion;
