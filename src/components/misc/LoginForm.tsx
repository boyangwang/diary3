import { Button, Form, Input } from 'antd';
import { firstLogin } from '../../app/login-user-slice';
import { useAppDispatch } from '../../app/store';

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(firstLogin(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form name="login-form" initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="github-username" name="uid" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="github-secret" name="githubSecret" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="github-repo" name="repo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
