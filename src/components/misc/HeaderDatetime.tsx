import { useEffect, useState } from 'react';
import { formatDatetime } from '../../app/types-constants';

function HeaderDatetime() {
  const [time, setTime] = useState(Number(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Number(new Date()));
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="text-center">
      <h1>{formatDatetime(time)}</h1>
    </div>
  );
}
export default HeaderDatetime;
