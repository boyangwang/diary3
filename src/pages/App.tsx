import './App.css';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import Navbar from '../components/misc/Navbar';
import { getDateStringFromNow, PAGES } from '../app/types-constants';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import UserHeader from '../components/misc/HeaderUser';
import HeaderDatetime from '../components/misc/HeaderDatetime';
import { useAppDispatch, useAppSelector } from '../app/store';
import { initDateStr } from '../app/ui-slice';
import { initDayEntryInstances } from '../app/entry-instances-slice';

function App() {
  const matches = useMatches();
  console.log('XXXTEMP in app', matches);
  const location = useLocation();
  const loginUser = useAppSelector((state) => state.loginUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dateStrNow = getDateStringFromNow();
    dispatch(initDateStr({ dateStr: dateStrNow }));
    dispatch(initDayEntryInstances({ dateStr: dateStrNow }));
  }, [dispatch]);

  const activeKey = useMemo(() => {
    let p;
    for (let m of matches) {
      p = PAGES.find((p: string) => m.pathname.startsWith(`/${p}`));
      if (p) {
        return p;
      }
    }
  }, [matches]);

  return (
    <>
      <Helmet>
        <title>Diary - {location.pathname}</title>
      </Helmet>
      <UserHeader loginUser={loginUser} />
      <HeaderDatetime />
      <Outlet />
      <Navbar activeKey={activeKey} />
    </>
  );
}

export default App;
