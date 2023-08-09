import { selectEntryInstancesMap, selectEntryTypesArray, useAppSelector } from '@/app/store';
import { EntryType } from '../../app/types-constants';
import EntryTypeCard from './EntryTypeCard';
import { useMemo } from 'react';

const EntryTypeListForCompletion = ({ selectedDateStr }: { selectedDateStr: string }) => {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);
  const entryInstancesMap = useAppSelector(selectEntryInstancesMap);

  const { doneList, restList } = useMemo(() => {
    const todayEntryInstances = entryInstancesMap[selectedDateStr];
    let doneEntryTypes = new Set(todayEntryInstances?.length ? todayEntryInstances.map(({ entryTypeId }) => entryTypeId) : []);
    console.log('===============doneEntryTypes', doneEntryTypes);
    if (!doneEntryTypes.size)
      return {
        restList: entryTypesArray,
        doneList: [],
      };
    return {
      restList: entryTypesArray.filter(({ id }) => !doneEntryTypes.has(id)),
      doneList: entryTypesArray.filter(({ id }) => doneEntryTypes.has(id)),
    };
  }, [entryInstancesMap, entryTypesArray, selectedDateStr]);
  return (
    <div className="flex flex-col gap-2">
      {restList?.length
        ? restList.map((item) => (
            <EntryTypeCard key={item.id} entryType={item} isEdit={false} selectedDayStr={selectedDateStr} />
          ))
        : null}
      <div className="mt-4 flex items-center justify-center border-t pt-2 text-xl font-semibold">Today Done List</div>
      {doneList?.length
        ? doneList.map((item) => (
            <EntryTypeCard key={item.id} entryType={item} isEdit={false} selectedDayStr={selectedDateStr} />
          ))
        : null}
    </div>
  );
};

export default EntryTypeListForCompletion;
