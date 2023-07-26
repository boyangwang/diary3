import { Button } from 'antd';
import { LoginUserState, onCloseUpdateLastUseTime, onLogoutClickClearState } from '../../app/login-user-slice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { formatDatetime } from '../../app/types-constants';
import { Descriptions } from 'antd';
import { saveStateToGithub, loadStateFromGithub } from './GithubStorage';
import ImportHistoryButton from 'src/components/misc/ImportHistoryButton';
import EmptyHistoryButton from './EmptyHistoryButton';
import packageJson from '../../../package.json';

function UserHeader(props: { loginUser: LoginUserState }) {
  const dispatch = useAppDispatch();
  const { loginUser } = props;

  window.addEventListener('beforeunload', (ev) => {
    ev.preventDefault();
    dispatch(onCloseUpdateLastUseTime());
  });

  const onLogoutClick = () => {
    dispatch(onLogoutClickClearState());
  };

  const state = useAppSelector((state) => state);

  return (
    <div className="flex">
      {loginUser.uid ? (
        <Descriptions bordered column={4}>
          <Descriptions.Item
            label={
              <>
                <p>{loginUser.uid}</p>
                <Button onClick={(e) => saveStateToGithub(state.loginUser)}>Save</Button>
                <Button onClick={(e) => loadStateFromGithub(state.loginUser)}>Load</Button>
              </>
            }
          >
            <h1>Diary</h1>
            <span>v{packageJson.version}</span>
            <Button type="dashed" danger onClick={onLogoutClick}>
              Logout
            </Button>
            <ImportHistoryButton />
            <EmptyHistoryButton />
          </Descriptions.Item>
          <Descriptions.Item label={<p>LastUse: {formatDatetime(loginUser.loginTime)}</p>}>
            <p>Streak days: 12</p>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <span>Not logged in</span>
      )}
    </div>
  );
}

export default UserHeader;
