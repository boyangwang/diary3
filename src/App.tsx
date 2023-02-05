import { Counter } from './components/counter/Counter';
import './App.css';
import { Outlet, useMatches } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { PAGES } from './constants';
import { useMemo } from 'react';

function App() {
  const matches = useMatches();
  
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
      <h1>Diary</h1>
      <Counter />
      <Outlet />
      <Navbar activeKey={activeKey} />
    </div>
  );
}

export default App;
