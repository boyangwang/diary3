import './App.css';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import Navbar from './components/Navbar';
import { loadLoginUser, LoginUser, PAGES, SetLoginUser } from './types-constants';
import { useMemo, createContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import UserHeader from './components/UserHeader';

export const LoginUserContext = createContext({} as { loginUser: LoginUser | null; setLoginUser: SetLoginUser });

function App() {
  const matches = useMatches();
  const location = useLocation();
  const [loginUser, setLoginUser] = useState(null as LoginUser | null);
  useEffect(() => {
    loadLoginUser(setLoginUser);
  }, []);

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
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      <Helmet>
        <title>Diary - {location.pathname}</title>
      </Helmet>
      <UserHeader />
      <Outlet />
      <Navbar activeKey={activeKey} />
    </LoginUserContext.Provider>
  );
}

export default App;
