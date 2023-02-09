import { Button } from 'antd';
import { onCloseUpdateLastUseTime, onLogoutClickClearState } from '../app/login-user-slice';
import { useAppDispatch, useAppSelector } from '../app/store';
import { formatDate, formatDatetime } from '../app/types-constants';
import './HeaderUser.css';

function UserHeader() {
  const loginUser = useAppSelector((state) => state.loginUser);
  const dispatch = useAppDispatch();

  window.addEventListener('beforeunload', (ev) => {
    ev.preventDefault();
    dispatch(onCloseUpdateLastUseTime());
  });

  const onLogoutClick = () => {
    dispatch(onLogoutClickClearState());
  };

  return (
    <div className="diary-user-header">
      {loginUser.uid ? (
        <>
          <span>{loginUser.uid}</span>
          <span>LoginSince: {formatDate(loginUser.loginTime)}</span>
          <span>LastUsed: {formatDatetime(loginUser.lastUseTime)}</span>
          <Button type="dashed" danger onClick={onLogoutClick}>
            Logout
          </Button>
        </>
      ) : (
        <span>Not logged in</span>
      )}
    </div>
  );
}

export default UserHeader;
