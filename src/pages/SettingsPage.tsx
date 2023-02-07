import { useContext } from 'react';
import { LoginUserContext } from '../App';
import GlobalStats from '../components/GlobalStats';
import LoginForm from '../components/LoginForm';

export default function SettingsPage() {
  const { loginUser } = useContext(LoginUserContext);

  return <div>{loginUser ? <GlobalStats /> : <LoginForm />}</div>;
}
