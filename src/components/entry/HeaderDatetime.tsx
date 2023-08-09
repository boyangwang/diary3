import { useEffect, useState } from 'react';
import { formatDatetime } from '../../app/types-constants';
import dayjs from 'dayjs';

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

  return <h1 className="text-center font-DDin text-2xl font-bold">{dayjs(time).format('h:mm:ssa | ddd YYYY-MMM-DD')}</h1>;
}
export default HeaderDatetime;
