import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { formatDateTime } from '@/utils/date';

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

  return <h1 className="text-center font-DDin text-2xl font-bold">{formatDateTime(time)}</h1>;
}
export default HeaderDatetime;
