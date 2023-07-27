import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useLocation } from 'react-router-dom';
import { initDayEntryInstances } from '../app/entry-instances-slice';
import { selectLoginUser, useAppDispatch, useAppSelector } from '../app/store';
import { getDateStringFromNow } from '../app/types-constants';
import { initDateStr } from '../app/ui-slice';
import Navbar from '../components/misc/Navbar';
import UserHeader from '@/components/misc/HeaderUser';

function App() {
  const location = useLocation();
  const loginUser = useAppSelector(selectLoginUser);
  const dispatch = useAppDispatch();
  const appDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dateStrNow = getDateStringFromNow();
    dispatch(initDateStr({ dateStr: dateStrNow }));
    dispatch(initDayEntryInstances({ dateStr: dateStrNow }));

    const setAppDivHeight = () => {
      if (appDivRef.current) {
        appDivRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    setAppDivHeight();
    window.addEventListener('resize', setAppDivHeight);

    return () => {
      window.removeEventListener('resize', setAppDivHeight);
    };
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Diary - {location.pathname}</title>
      </Helmet>
      <div ref={appDivRef} className={clsx('flex flex-col overflow-hidden')}>
        <UserHeader loginUser={loginUser} />
        <main className="min relative flex-grow overflow-auto scroll-smooth bg-[#F6F6F6]">
          <Outlet />
        </main>
        <Navbar />
      </div>
    </>
  );
}

export default App;
