import EntryChart from '../components/entry/EntryChart';
import EntryProgressBar from '../components/entry/EntryProgressBar';
import EntryTypeListForCompletion from '../components/entry/EntryTypeListForCompletion';
import {
  selectEntryInstancesMap,
  selectEntryTypesArray,
  selectTodayEntryInstances,
  selectTodayTotalPoints,
  useAppSelector,
} from '../app/store';
import EntryInstanceList from '../components/entry/EntryInstanceList';
import HeaderDatetime from '@/components/misc/HeaderDatetime';

export default function EntryPage() {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);
  const entryInstancesMap = useAppSelector(selectEntryInstancesMap);
  const todayEntryInstances = useAppSelector(selectTodayEntryInstances);
  const todayPoints = useAppSelector(selectTodayTotalPoints);

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto px-4 py-6 text-center">
      <HeaderDatetime />
      <EntryProgressBar points={todayPoints} />
      <EntryInstanceList entryInstancesArray={todayEntryInstances} />
      <EntryChart entryInstancesMap={entryInstancesMap} />
      <EntryTypeListForCompletion entryTypesArray={entryTypesArray} />
    </div>
  );
}
