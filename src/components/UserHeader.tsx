import { Button } from 'antd';
import { useContext } from 'react';
import { LoginUserContext } from '../App';
import { saveLoginUser } from '../types-constants';
import './UserHeader.css';

function UserHeader() {
  const { loginUser, setLoginUser } = useContext(LoginUserContext);

  const onLogoutClick = () => {
    console.log('Logout');
    saveLoginUser(null, setLoginUser);
  };

  return (
    <div className="diary-user-header">
      <span>{JSON.stringify(loginUser)}</span>{' '}
      <Button type="dashed" danger onClick={onLogoutClick}>
        Logout
      </Button>
    </div>
  );
}

export default UserHeader;
