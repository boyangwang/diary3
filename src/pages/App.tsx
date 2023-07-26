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
import clsx from 'clsx';
function App() {
  const matches = useMatches();
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
      <div className={clsx('flex h-screen min-h-screen flex-col')}>
        <HeaderDatetime />
        <main className="relative flex-grow overflow-auto scroll-smooth pb-12">
          <Outlet />
        </main>
        <Navbar activeKey={activeKey} />
      </div>
    </>
  );
}

export default App;
