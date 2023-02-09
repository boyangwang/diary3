import './App.css';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PAGES } from '../app/types-constants';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import UserHeader from '../components/HeaderUser';
import HeaderDatetime from '../components/HeaderDatetime';

function App() {
  const matches = useMatches();
  const location = useLocation();

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
      <UserHeader />
      <HeaderDatetime />
      <Outlet />
      <Navbar activeKey={activeKey} />
    </>
  );
}

export default App;
