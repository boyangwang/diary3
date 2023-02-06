import { useEffect, useState } from 'react';
import EntryChart from '../components/EntryChart';
import EntryProgressBar from '../components/EntryProgressBar';
import EntryTypeList from '../components/EntryTypeList';
import HeaderDatetime from '../components/HeaderDatetime';
import { EntryType } from '../types-constants';

const entryTypeList: EntryType[] = [];
for (let i = 1; i < 6; i++) {
  entryTypeList.push(
    new EntryType({
      id: i,
      title: `test${i}`,
      defaultPoints: i,
      pointStep: i / 10,
    }),
  );
}

export default function EntryPage() {
  const [points, setPoints] = useState(() => 0);

  // TEMP CODE START
  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((points) => (points + 1) % 26);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  // TEMP CODE END

  return (
    <>
      <HeaderDatetime />
      <EntryProgressBar points={points} />
      <EntryChart />
      <EntryTypeList entryTypeList={entryTypeList} />
    </>
  );
}
