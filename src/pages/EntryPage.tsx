import EntryChart from '../components/EntryChart';
import EntryProgressBar from '../components/EntryProgressBar';
import EntryTypeListForCompletion from '../components/EntryTypeListForCompletion';
import { selectEntryInstancesArray, selectEntryTypesArray, useAppSelector } from '../app/store';
import EntryInstanceList from '../components/EntryInstanceList';

export default function EntryPage() {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);
  const entryInstancesArray = useAppSelector(selectEntryInstancesArray);

  return (
    <>
      <EntryProgressBar points={Math.ceil(Math.random() * 30)} />
      <EntryInstanceList entryInstancesArray={entryInstancesArray} />
      <EntryChart />
      <EntryTypeListForCompletion entryTypesArray={entryTypesArray} />
    </>
  );
}
