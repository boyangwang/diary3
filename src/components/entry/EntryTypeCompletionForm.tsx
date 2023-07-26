import { Form, Input, InputNumber, Button } from 'antd';
import { createEntryInstance } from '../../app/entry-instances-slice';
import { useAppDispatch } from '../../app/store';
import { EntryType, getEntryInstanceIdFromEntryType } from '../../app/types-constants';

function EntryTypeCompletionForm(props: { entryType: EntryType }) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    console.log('Completion Form Values: ', values);
    const now = Number(new Date());
    dispatch(
      createEntryInstance({
        id: getEntryInstanceIdFromEntryType(props.entryType),
        createdAt: now,
        updatedAt: now,
        entryTypeId: props.entryType.id,
        points: values.points,
        notes: values.notes,
      }),
    );
    form.resetFields();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Completion Form Err: ', errorInfo);
  };

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
