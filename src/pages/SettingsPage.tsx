import { useAppSelector } from '../app/store';
import GlobalStats from '../components/GlobalStats';
import LoginForm from '../components/LoginForm';

export default function SettingsPage() {
  const loginUser = useAppSelector((state) => state.loginUser);
  return <div>{loginUser.uid ? <GlobalStats /> : <LoginForm />}</div>;
}
