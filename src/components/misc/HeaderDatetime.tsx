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

  return <h1 className="text-center font-DDin text-2xl font-bold">{formatDatetime(time)}</h1>;
}
export default HeaderDatetime;
