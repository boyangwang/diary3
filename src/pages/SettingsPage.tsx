import clsx from 'clsx';
import { selectLoginUser, useAppSelector } from '../app/store';
import GlobalStats from '../components/misc/GlobalStats';
import LoginForm from '../components/misc/LoginForm';

export default function SettingsPage() {
  const loginUser = useAppSelector(selectLoginUser);
  return <div className={clsx('px-5')}>{loginUser.uid ? <GlobalStats /> : <LoginForm />}</div>;
}
