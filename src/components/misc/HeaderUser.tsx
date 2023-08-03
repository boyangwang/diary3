import { formatDatetime } from '@/app/types-constants';
import clsx from 'clsx';
import { useCallback } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ImportHistoryButton from 'src/components/misc/ImportHistoryButton';
import { twMerge } from 'tailwind-merge';
import packageJson from '../../../package.json';
import { LoginUserState, onCloseUpdateLastUseTime, onLogoutClickClearState } from '../../app/login-user-slice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import Button from '../button';
import Collapse from '../collapse';
import EmptyHistoryButton from './EmptyHistoryButton';
import { loadStateFromGithub, saveStateToGithub } from './GithubStorage';

function UserHeader(props: { loginUser: LoginUserState; className?: string }) {
  const dispatch = useAppDispatch();
  const { loginUser, className } = props;

  // window.addEventListener('beforeunload', (ev) => {
  //   ev.preventDefault();
  //   dispatch(onCloseUpdateLastUseTime());
  // });

  const onLogoutClick = () => {
    dispatch(onLogoutClickClearState());
  };
  const state = useAppSelector((state) => state);
  const save = useCallback(() => saveStateToGithub(state.loginUser), [state.loginUser]);
  const loaded = useCallback(() => loadStateFromGithub(state.loginUser), [state.loginUser]);
  return (
    <Collapse
      initOpen
      renderTitle={({ isOpen }) => (
        <MdExpandMore
          className={clsx(
            'fixed left-2 top-2 z-[1] h-9 w-9 cursor-pointer',
            isOpen ? 'rotate-180 text-white' : 'rotate-0 text-gradient-home-from',
          )}
        />
      )}
    >
      <div
        className={twMerge(
          'flex flex-wrap items-center justify-center gap-2 overflow-auto bg-gradient-home-from px-4 py-3 text-white transition',
          className,
        )}
      >
        {loginUser.uid ? (
          <>
            <div className="flex flex-col items-center gap-2 text-sm">
              <p>LastUse: {formatDatetime(loginUser.loginTime)}</p>
              <p>Streak days: 12</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-sm">
              <p>{loginUser.uid}</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button onClick={save}>Save</Button>
                <Button onClick={loaded}>Load</Button>
                <Button className="flex items-center gap-2" onClick={onLogoutClick}>
                  <RiLogoutBoxRLine className="h-6 w-6" /> Logout
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-sm">
              <h1>Diary</h1>
              <p className="text-base font-bold">v{packageJson.version}</p>
            </div>
            {/* <ImportHistoryButton />
            <EmptyHistoryButton /> */}
          </>
        ) : (
          <p className="text-xl">
            Not logged in, Let&apos;s{' '}
            <Link className="mix-blend-plus-lighter" to="/settings">
              Get Started
            </Link>
          </p>
        )}
      </div>
    </Collapse>
  );
}

export default UserHeader;
