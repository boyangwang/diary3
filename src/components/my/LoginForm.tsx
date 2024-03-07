import { Form, Input } from 'antd';
import { firstLogin } from '../../app/login-user-slice';
import { useAppDispatch } from '../../app/store';
import { AiFillGithub } from 'react-icons/ai';
import Button from '../button';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

const LoginForm = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: any) => {
    console.log('Success:', values);
    toast.success(`${values?.uid} Login successfully!`);
    dispatch(firstLogin(values));
  };

  const onError = useCallback((errors: any) => {
    for (let field in errors) {
      if (errors?.[field]?.message) {
        toast.error(errors?.[field]?.message?.toString() as string);
        return;
      }
    }

    toast.error('Login Error!');
  }, []);

  return (
    <form className={clsx('flex flex-col items-center gap-4 text-white', className)} onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="h-4 text-red-400">*</div>
            <label htmlFor="uid">github-username</label>
          </div>
          {errors?.uid?.message && <p className="text-red-400">{errors?.uid?.message.toString()}</p>}
        </div>
        <input
          aria-label="uid"
          className="flex-grow rounded-lg px-2 py-1 text-black"
          {...register('uid', { required: 'username is required' })}
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="githubSecret"> github-secret </label>
        <input aria-label="githubSecret" className="flex-grow rounded-lg px-2 py-1 text-black" {...register('githubSecret')} />
      </div>
      <div className="flex gap-2">
        <label htmlFor="repo">github-repo</label>
        <input aria-label="repo" className="flex-grow rounded-lg px-2 py-1 text-black" {...register('repo')} />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="h-4 text-red-400">*</div>
            <label htmlFor="email">github-email</label>
          </div>
          {errors?.email?.message && <p className="text-red-400">{errors?.email?.message.toString()}</p>}
        </div>
        <input
          aria-label="email"
          className="flex-grow rounded-lg px-2 py-1 text-black"
          {...register('email', { required: 'email is required' })}
        />
      </div>
      <Button htmlType="submit" className="flex w-full items-center justify-center gap-2 py-3">
        <AiFillGithub className="h-6 w-6" /> Login with Github
      </Button>
    </form>
    // <Form
    //   name="login-form"
    //   className={clsx('flex flex-col justify-end', className)}
    //   initialValues={{}}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    // >
    //   <Form.Item label="github-username" name="uid" rules={[{ required: true }]}>
    //     <Input />
    //   </Form.Item>
    //   <Form.Item label="github-secret" name="githubSecret" rules={[{ required: true }]}>
    //     <Input />
    //   </Form.Item>
    //   <Form.Item label="github-repo" name="repo" rules={[{ required: true }]}>
    //     <Input />
    //   </Form.Item>
    //   <Form.Item label="email" name="email" rules={[{ required: true }]}>
    //     <Input />
    //   </Form.Item>
    //   <Form.Item>
    //     <Button htmlType="submit" className="flex w-full items-center justify-center gap-2 py-3">
    //       <AiFillGithub className="h-6 w-6" /> Login with Github
    //     </Button>
    //   </Form.Item>
    // </Form>
  );
};

export default LoginForm;
