import { useEffect, useState } from 'react';
import { formatDatetime } from '../../app/types-constants';
import './HeaderDatetime.css';

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
    <div className="diary-header-datetime">
      <h1>{formatDatetime(time)}</h1>
    </div>
  );
}
export default HeaderDatetime;
