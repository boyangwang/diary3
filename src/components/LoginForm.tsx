import { Button, Form, Input } from 'antd';
import { useContext } from 'react';
import { LoginUserContext } from '../App';
import { saveLoginUser } from '../types-constants';

const LoginForm = () => {
  const { setLoginUser } = useContext(LoginUserContext);

  const onFinish = (values: any) => {
    console.log('Success:', values);

    saveLoginUser({ uid: values.uid }, setLoginUser);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form name="login-form" initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="UID" name="uid" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
