import { Form, Input, InputNumber, Button } from 'antd';
import { EntryType } from '../app/types-constants';

function EntryTypeCompletionForm(props: { entryType: EntryType }) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {};
  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Form
      name="completion-form"
      layout="inline"
      form={form}
      initialValues={{ points: props.entryType.defaultPoints, notes: '' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Notes" name="notes">
        <Input.TextArea size="small" showCount />
      </Form.Item>
      <Form.Item label="Points" name="points" rules={[{ required: true, message: 'points is required' }]}>
        <InputNumber step={props.entryType.pointStep} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          DONE
        </Button>
      </Form.Item>
    </Form>
  );
}
export default EntryTypeCompletionForm;
