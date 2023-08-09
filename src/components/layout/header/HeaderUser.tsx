import { formatDatetime } from '@/app/types-constants';
import GithubLoadDialog from '@/components/app/GithubLoadDialog';
import { globalStateAtom, loadDialogOpenAtom } from '@/store/app';
import clsx from 'clsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
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
import dayjs from 'dayjs';

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
  const logged = useMemo(() => !!loginUser?.uid, [loginUser]);
  return (
    <Collapse
      initOpen={logged}
      disabled={!logged}
      renderTitle={({ isOpen }) => (
        <div
          className={clsx(
            'relative flex cursor-pointer justify-between bg-white px-4 py-4',
            isOpen ? 'rounded-none' : 'rounded-b-2xl',
          )}
        >
          {logged ? (
            <>
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-base">
                  <span className="font-semibold">{loginUser.uid}</span>
                  {' ‘s Diary'}
                </p>
                <p className="text-xs text-black/40">
                  LastUse: {dayjs(loginUser?.lastUseTime).format('h:mma | ddd YYYY-MMM-DD')}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-right text-xs">STREAK DAYS</div>
                <div className="font-DDin text-2xl/8 font-bold">{globalState?.currentStreakByEntry ?? 0}</div>
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
      {logged && (
        <div
          className={twMerge(
            'flex flex-wrap items-center justify-center gap-2 rounded-b-2xl bg-white px-4 pb-4 transition',
            className,
          )}
        >
          <div className="flex items-center gap-2 text-sm">
            <h1>Diary</h1>
            <p className="text-base font-bold">v{packageJson.version}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button size="large" onClick={save}>
                Save
              </Button>
              <Button size="large" onClick={() => setLoadOpen(true)}>
                Load
              </Button>
              <Button size="large" type="link" className="flex items-center gap-2" onClick={onLogoutClick}>
                Logout
              </Button>
            </div>
          </div>
          {/* <ImportHistoryButton />
            <EmptyHistoryButton /> */}
        </div>
      )}
    </Collapse>
  );
}

export default UserHeader;
