import EntryChart from '../components/EntryChart';
import EntryProgressBar from '../components/EntryProgressBar';
import EntryTypeListForCompletion from '../components/EntryTypeListForCompletion';
import { selectDateStr, selectEntryInstancesMap, selectEntryTypesArray, useAppSelector } from '../app/store';
import EntryInstanceList from '../components/EntryInstanceList';

export default function EntryPage() {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);
  const entryInstancesMap = useAppSelector(selectEntryInstancesMap);
  const dateStr = useAppSelector(selectDateStr);

  return (
    <>
      <EntryProgressBar points={Math.ceil(Math.random() * 30)} />
      <EntryInstanceList entryInstancesArray={entryInstancesMap[dateStr]} />
      <EntryChart />
      <EntryTypeListForCompletion entryTypesArray={entryTypesArray} />
    </>
  );
}
