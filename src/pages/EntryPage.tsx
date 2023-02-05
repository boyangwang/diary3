import { useEffect, useState } from 'react';
import EntryProgressBar from '../components/EntryProgressBar';
import HeaderDatetime from '../components/HeaderDatetime';

export default function EntryPage() {
  const [points, setPoints] = useState(() => 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((points) => (points + 1) % 26);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <HeaderDatetime />
      <EntryProgressBar points={points} />
    </>
  );
}
