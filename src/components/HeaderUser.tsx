import { Button } from 'antd';
import { LoginUserState, onCloseUpdateLastUseTime, onLogoutClickClearState } from '../app/login-user-slice';
import { useAppDispatch, useAppSelector } from '../app/store';
import { formatDatetime, getDatetimeStringFromNow } from '../app/types-constants';
import { Descriptions } from 'antd';
import './HeaderUser.css';

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

  const handleSaveClick = () => {
    const jsonState = JSON.stringify(state);
    const element = document.createElement('a');
    const file = new Blob([jsonState], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `diarystate-${getDatetimeStringFromNow()}.json`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="diary-user-header">
      {loginUser.uid ? (
        <>
          <Descriptions bordered column={4}>
            <Descriptions.Item label={loginUser.uid}>
              <Button onClick={handleSaveClick}>Save</Button>
              <Button>Load</Button>
            </Descriptions.Item>
            <Descriptions.Item label="LoginSince:">{formatDatetime(loginUser.loginTime)}</Descriptions.Item>
            <Descriptions.Item label="Logout">
              <Button type="dashed" danger onClick={onLogoutClick}>
                Logout
              </Button>
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <span>Not logged in</span>
      )}
    </div>
  );
}

export default UserHeader;
