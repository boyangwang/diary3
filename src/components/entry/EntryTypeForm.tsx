import { Button, Form, Input, InputNumber, Radio } from 'antd';
import { EditNavIcon, EntryNavIcon } from '../misc/DiaryIcons';
import { RoutineEnum, EntryTypeThemeColors, EntryTypeConstructor, EntryType } from '../../app/types-constants';
import { useAppDispatch } from '../../app/store';
import { createEntryType, updateEntryType } from '../../app/entry-types-slice';
import { exitEntryTypeEdit } from '../../app/ui-slice';
import { useEffect } from 'react';
import './EntryTypeForm.css';

const EntryTypeThemeColorsRadio = EntryTypeThemeColors.map((themeColorPair) => {
  return (
    <Radio.Button key={themeColorPair[0]} value={JSON.stringify(themeColorPair)}>
      {JSON.stringify(themeColorPair)}
    </Radio.Button>
  );
});

const addInitialValues = {
  routine: RoutineEnum.adhoc,
  themeColors: JSON.stringify(EntryTypeThemeColors[(EntryTypeThemeColors.length * Math.random()) | 0]),
  defaultPoints: 1,
  pointStep: 1,
  id: '',
  title: '',
};

const EntryTypeForm = (props: { isUpdate: boolean; updatingEntryType?: null | EntryType; entryTypeIds: string[] }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.title) {
      // replace non-alphanumeric characters in title with hyphens
      const id = changedValues.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/gi, '');
      form.setFieldsValue({ id });
    }
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    values.themeColors = JSON.parse(values.themeColors);
    const entryType = EntryTypeConstructor(values);
    if (props.isUpdate) {
      entryType.updatedAt = Number(new Date());
      dispatch(updateEntryType(entryType));
      dispatch(exitEntryTypeEdit());
    } else {
      dispatch(createEntryType(entryType));
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onCancelUpdateClick = () => {
    dispatch(exitEntryTypeEdit());
  };

  useEffect(() => {
    if (props.isUpdate) {
      form.setFieldsValue({
        ...props.updatingEntryType,
        themeColors: props.updatingEntryType ? JSON.stringify(props.updatingEntryType.themeColors) : '',
      });
    } else {
      form.setFieldsValue(addInitialValues);
    }
  }, [props.isUpdate, props.updatingEntryType, form]);

  return (
    <Form
      className="diary-entry-type-form"
      name="entry-type-form"
      form={form}
      initialValues={addInitialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        name="id"
        rules={[
          { required: true, message: 'id is required' },
          {
            validator: (_, id) => {
              if (props.isUpdate) {
                return Promise.resolve();
              } else {
                return props.entryTypeIds.includes(id) ? Promise.reject('id already exists') : Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item name="title" rules={[{ required: true, message: 'title is required' }]}>
        <Input placeholder="Title" prefix={<EntryNavIcon />} />
      </Form.Item>

      <Form.Item name="defaultPoints" rules={[{ required: true, message: 'defaultPoints is required' }]}>
        <InputNumber min={-60} max={60} step={0.5} size="large" />
      </Form.Item>
      <Form.Item name="pointStep" rules={[{ required: true, message: 'pointStep is required' }]}>
        <InputNumber min={0} max={60} step={0.5} size="large" />
      </Form.Item>

      <Form.Item name="routine" rules={[{ required: true, message: 'routine is required' }]}>
        <Radio.Group>
          <Radio.Button key={RoutineEnum.adhoc} value={RoutineEnum.adhoc}>
            {RoutineEnum.adhoc}
          </Radio.Button>
          <Radio.Button key={RoutineEnum.daily} value={RoutineEnum.daily}>
            {RoutineEnum.daily}
          </Radio.Button>
          <Radio.Button key={RoutineEnum.weekly} value={RoutineEnum.weekly}>
            {RoutineEnum.weekly}
          </Radio.Button>
          <Radio.Button key={RoutineEnum.monthly} value={RoutineEnum.monthly}>
            {RoutineEnum.monthly}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="themeColors" rules={[{ required: true, message: 'themeColor is required' }]}>
        <Radio.Group>{EntryTypeThemeColorsRadio}</Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button className="diary-entry-type-form-button" type="primary" htmlType="submit" block size="large">
          <EditNavIcon /> {props.isUpdate ? 'Update' : 'Create'}
        </Button>
      </Form.Item>
      {props.isUpdate && <Button onClick={onCancelUpdateClick}>Cancel</Button>}
    </Form>
  );
};

export default EntryTypeForm;
