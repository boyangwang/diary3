import { formatDatetime } from '@/app/types-constants';
import GithubLoadDialog from '@/components/app/GithubLoadDialog';
import { globalStateAtom, loadDialogOpenAtom } from '@/store/app';
import clsx from 'clsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { MdExpandMore } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import packageJson from '../../../../package.json';
import { LoginUserState, onCloseUpdateLastUseTime, onLogoutClickClearState } from '../../../app/login-user-slice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import Button from '../../button';
import Collapse from '../../collapse';
import { saveStateToGithub } from './GithubStorage';

function UserHeader(props: { loginUser: LoginUserState; className?: string }) {
  const dispatch = useAppDispatch();
  const { loginUser, className } = props;
  const globalState = useAtomValue(globalStateAtom);

  useBeforeunload(() => {
    dispatch(onCloseUpdateLastUseTime());
  });

  const onLogoutClick = () => {
    dispatch(onLogoutClickClearState());
  };
  const state = useAppSelector((state) => state);
  const save = useCallback(() => saveStateToGithub(state.loginUser), [state.loginUser]);
  const setLoadOpen = useSetAtom(loadDialogOpenAtom);
  return (
    <Collapse
      initOpen={!!loginUser.uid}
      disabled={!!loginUser.uid}
      renderTitle={({ isOpen }) => (
        <div
          className={clsx(
            'relative flex cursor-pointer justify-between gap-2 bg-white px-4 py-4',
            isOpen ? 'rounded-none' : 'rounded-b-2xl',
          )}
        >
          {loginUser.uid ? (
            <>
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-base">
                  <span className="font-semibold">{loginUser.uid}</span>
                  {' ‘s Diary'}
                </p>
                <p className="text-xs text-black/40">LastUse: {formatDatetime(loginUser.lastUseTime)}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-right text-xs">STREAK DAYS</div>
                <div className="font-DDin text-2xl/8 font-bold">{globalState?.historicalLongestStreakByEntry ?? 0}</div>
                <MdExpandMore className={clsx('z-[1] h-9 w-9 cursor-pointer text-black', isOpen ? 'rotate-180' : 'rotate-0')} />
              </div>
            </>
          ) : (
            <div className="w-full text-center text-xl">
              Not logged in, Let&apos;s{' '}
              <Link className="text-blue" to="/settings">
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    >
      {loginUser.uid ? (
        <div
          className={twMerge(
            'flex flex-wrap items-center justify-center gap-4 rounded-b-2xl bg-white px-4 pb-4 transition',
            className,
          )}
        >
          <div className="flex items-center gap-2 text-sm">
            <h1>Diary</h1>
            <p className="text-base font-bold">v{packageJson.version}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button onClick={save}>Save</Button>
              <Button onClick={() => setLoadOpen(true)}>Load</Button>
              <Button type="link" className="flex items-center gap-2" onClick={onLogoutClick}>
                Logout
              </Button>
            </div>
          </div>
          {/* <ImportHistoryButton />
            <EmptyHistoryButton /> */}
        </div>
      ) : null}
    </Collapse>
  );
}

export default UserHeader;
