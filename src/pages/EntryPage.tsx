import EntryChart from '../components/EntryChart';
import EntryProgressBar from '../components/EntryProgressBar';
import EntryTypeListForCompletion from '../components/EntryTypeListForCompletion';
import { selectEntryTypesArray, selectTodayEntryInstances, selectTodayTotalPoints, useAppSelector } from '../app/store';
import EntryInstanceList from '../components/EntryInstanceList';
import ImportHistoryButton from '../components/ImportHistoryButton';

export default function EntryPage() {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);
  const todayEntryInstances = useAppSelector(selectTodayEntryInstances);
  const todayPoints = useAppSelector(selectTodayTotalPoints);

  return (
    <>
      <EntryProgressBar points={todayPoints} />
      <EntryInstanceList entryInstancesArray={todayEntryInstances} />
      <EntryChart />
      <EntryTypeListForCompletion entryTypesArray={entryTypesArray} />
    </>
  );
}
