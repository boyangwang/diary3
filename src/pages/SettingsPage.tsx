import { selectLoginUser, useAppSelector } from '../app/store';
import GlobalStats from '../components/misc/GlobalStats';
import LoginForm from '../components/misc/LoginForm';

export default function SettingsPage() {
  const loginUser = useAppSelector(selectLoginUser);
  return <div>{loginUser.uid ? <GlobalStats /> : <LoginForm />}</div>;
}
