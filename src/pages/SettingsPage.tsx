import clsx from 'clsx';
import { selectLoginUser, useAppSelector } from '../app/store';
import LoginForm from '@/components/my/LoginForm';
import GlobalStats from '@/components/my/GlobalStats';

export default function SettingsPage() {
  const loginUser = useAppSelector(selectLoginUser);

  return (
    <div className={clsx('flex h-full flex-col items-center gap-4 bg-gradient-home px-5 py-10 text-center')}>
      <h1 className="flex-grow text-[2.375rem]/[3.125rem] font-bold text-white">
        Time Is Your Most Valuable Asset - Til Immortality
      </h1>
      {loginUser.uid ? <GlobalStats /> : <LoginForm />}
    </div>
  );
}
