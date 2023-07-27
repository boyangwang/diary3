import { RiLogoutBoxRLine } from 'react-icons/ri';
import ImportHistoryButton from 'src/components/misc/ImportHistoryButton';
import { twMerge } from 'tailwind-merge';
import packageJson from '../../../package.json';
import { LoginUserState, onCloseUpdateLastUseTime, onLogoutClickClearState } from '../../app/login-user-slice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import Button from '../button';
import EmptyHistoryButton from './EmptyHistoryButton';
import { loadStateFromGithub, saveStateToGithub } from './GithubStorage';
import { formatDatetime } from '@/app/types-constants';
import { Link } from 'react-router-dom';

function UserHeader(props: { loginUser: LoginUserState; className?: string }) {
  const dispatch = useAppDispatch();
  const { loginUser, className } = props;

  window.addEventListener('beforeunload', (ev) => {
    ev.preventDefault();
    dispatch(onCloseUpdateLastUseTime());
  });

  const onLogoutClick = () => {
    dispatch(onLogoutClickClearState());
  };

  const state = useAppSelector((state) => state);

  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center justify-center gap-4 bg-gradient-home-from px-4 py-3 text-white',
        className,
      )}
    >
      {loginUser.uid ? (
        <>
          <div className="flex flex-col items-center gap-2 text-sm">
            <p>{loginUser.uid}</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button onClick={() => saveStateToGithub(state.loginUser)}>Save</Button>
              <Button onClick={() => loadStateFromGithub(state.loginUser)}>Load</Button>
              <Button onClick={onLogoutClick}>
                <RiLogoutBoxRLine className="h-6 w-6" /> Logout
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm">
            <h1>Diary</h1>
            <p className="text-base font-bold">v{packageJson.version}</p>
          </div>
          <ImportHistoryButton />
          <EmptyHistoryButton />
          <div className="flex flex-col items-center gap-2 text-sm">
            <p>LastUse: {formatDatetime(loginUser.loginTime)}</p>
            <p>Streak days: 12</p>
          </div>
        </>
      ) : (
        <p className="text-xl">
          Not logged in, Let&apos;s{' '}
          <Link className="text-blue" to="/settings">
            Get Started
          </Link>
        </p>
      )}
    </div>
  );
}

export default UserHeader;
