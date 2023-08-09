import { Form, Input } from 'antd';
import { firstLogin } from '../../app/login-user-slice';
import { useAppDispatch } from '../../app/store';
import { AiFillGithub } from 'react-icons/ai';
import Button from '../button';
import clsx from 'clsx';

const LoginForm = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(firstLogin(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="login-form"
      className={clsx('flex flex-col justify-end', className)}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
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
        <Button htmlType="submit" className="flex w-full items-center justify-center gap-2 py-3">
          <AiFillGithub className="h-6 w-6" /> Login with Github
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
