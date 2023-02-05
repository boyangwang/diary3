import moment from 'moment';
import { useEffect, useState } from 'react';
import './HeaderDatetime.css';

function HeaderDatetime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="diary-header-datetime">
      <h1>{moment().format('hh:mm:ss a | ddd DD MMM YYYY')}</h1>
    </div>
  );
}
export default HeaderDatetime;
