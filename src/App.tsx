import './App.css';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import Navbar from './components/Navbar';
import { PAGES } from './constants';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';

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
    <div className="App">
      <Helmet>
        <title>Diary - {location.pathname}</title>
      </Helmet>
      <Outlet />
      <Navbar activeKey={activeKey} />
    </div>
  );
}

export default App;
