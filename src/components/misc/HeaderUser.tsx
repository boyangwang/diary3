import { LoginUserState, onCloseUpdateLastUseTime, onLogoutClickClearState } from '../../app/login-user-slice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { formatDatetime } from '../../app/types-constants';
import { Descriptions } from 'antd';
import { saveStateToGithub, loadStateFromGithub } from './GithubStorage';
import ImportHistoryButton from 'src/components/misc/ImportHistoryButton';
import EmptyHistoryButton from './EmptyHistoryButton';
import packageJson from '../../../package.json';
import Button from '../button';
import { twMerge } from 'tailwind-merge';

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
    <div className={twMerge('flex', className)}>
      {loginUser.uid ? (
        <Descriptions bordered column={4}>
          <Descriptions.Item
            label={
              <>
                <p>{loginUser.uid}</p>
                <Button onClick={() => saveStateToGithub(state.loginUser)}>Save</Button>
                <Button onClick={() => loadStateFromGithub(state.loginUser)}>Load</Button>
              </>
            }
          >
            <h1>Diary</h1>
            <span>v{packageJson.version}</span>
            <Button onClick={onLogoutClick}>Logout</Button>
            <ImportHistoryButton />
            <EmptyHistoryButton />
          </Descriptions.Item>
          <Descriptions.Item label={<p>LastUse: {formatDatetime(loginUser.loginTime)}</p>}>
            <p>Streak days: 12</p>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <span>Not logged in, Let&apos;s Get Started</span>
      )}
    </div>
  );
}

export default UserHeader;
