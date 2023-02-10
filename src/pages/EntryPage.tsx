import { useEffect, useState } from 'react';
import EntryChart from '../components/EntryChart';
import EntryProgressBar from '../components/EntryProgressBar';
import EntryTypeListForCompletion from '../components/EntryTypeListForCompletion';
import { selectEntryTypesArray, useAppSelector } from '../app/store';

export default function EntryPage() {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);

  return (
    <>
      <EntryProgressBar points={Math.random() * 30} />
      <EntryChart />
      <EntryTypeListForCompletion entryTypesArray={entryTypesArray} />
    </>
  );
}
