import clsx from 'clsx';
import { selectLoginUser, useAppSelector } from '../app/store';
import LoginForm from '@/components/my/LoginForm';
import GlobalStats from '@/components/my/GlobalStats';

export default function SettingsPage() {
  const loginUser = useAppSelector(selectLoginUser);

  return (
    <div className={clsx('flex h-full flex-col items-center justify-end gap-4 bg-gradient-home px-5 py-10 text-center')}>
      {loginUser.uid ? <GlobalStats /> : <LoginForm />}
    </div>
  );
}
