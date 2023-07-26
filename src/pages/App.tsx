import clsx from 'clsx';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useLocation } from 'react-router-dom';
import { initDayEntryInstances } from '../app/entry-instances-slice';
import { useAppDispatch, useAppSelector } from '../app/store';
import { getDateStringFromNow } from '../app/types-constants';
import { initDateStr } from '../app/ui-slice';
import UserHeader from '../components/misc/HeaderUser';
import Navbar from '../components/misc/Navbar';
function App() {
  const location = useLocation();
  const loginUser = useAppSelector((state) => state.loginUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dateStrNow = getDateStringFromNow();
    dispatch(initDateStr({ dateStr: dateStrNow }));
    dispatch(initDayEntryInstances({ dateStr: dateStrNow }));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Diary - {location.pathname}</title>
      </Helmet>
      <div className={clsx('flex h-screen min-h-screen flex-col')}>
        <UserHeader loginUser={loginUser} />
        <main className="relative flex-grow overflow-auto scroll-smooth bg-[#F6F6F6]">
          <Outlet />
        </main>
        <Navbar />
      </div>
    </>
  );
}

export default App;
