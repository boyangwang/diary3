import { Form, Input, InputNumber, Radio } from 'antd';
import { EditNavIcon, EntryNavIcon } from '../misc/DiaryIcons';
import { RoutineEnum, EntryTypeThemeColors, EntryTypeConstructor, EntryType } from '../../app/types-constants';
import { useAppDispatch } from '../../app/store';
import { createEntryType, updateEntryType } from '../../app/entry-types-slice';
import { exitEntryTypeEdit } from '../../app/ui-slice';
import { useEffect } from 'react';
import Button from '../button';

const EntryTypeThemeColorsRadio = EntryTypeThemeColors.map((themeColorPair) => {
  return (
    <div key={themeColorPair[0]} className="inline-block p-4">
      <input
        style={{ background: `linear-gradient(90deg, #${themeColorPair[0]} 0%, #${themeColorPair[1]} 100%)` }}
        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-8 w-8 appearance-none rounded-full border-2 border-solid border-neutral-300 bg-origin-padding p-1 before:pointer-events-none before:absolute before:h-5 before:w-5 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue checked:before:opacity-[0.16] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-blue checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
        type="radio"
        name="themeColors"
        id={themeColorPair[0]}
        value={JSON.stringify(themeColorPair)}
      />
    </div>
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
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-medium">Add Entry</h1>
      <Form
        className="flex flex-col gap-2"
        name="entry-type-form"
        form={form}
        initialValues={addInitialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          name="id"
          label="ID"
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

        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'title is required' }]}>
          <Input placeholder="Title" prefix={<EntryNavIcon />} />
        </Form.Item>

        <div className="flex items-center gap-4">
          <Form.Item
            name="defaultPoints"
            label="DefaultPoints"
            rules={[{ required: true, message: 'defaultPoints is required' }]}
          >
            <InputNumber min={-60} max={60} step={0.5} size="large" />
          </Form.Item>
          <Form.Item name="pointStep" label="PointStep" rules={[{ required: true, message: 'pointStep is required' }]}>
            <InputNumber min={0} max={60} step={0.5} size="large" />
          </Form.Item>
        </div>

        <Form.Item name="routine" label="Routine" rules={[{ required: true, message: 'routine is required' }]}>
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

        <Form.Item name="themeColors" label="ThemeColors" rules={[{ required: true, message: 'themeColor is required' }]}>
          <div className="flex justify-center">{EntryTypeThemeColorsRadio}</div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="rounded-full font-bold" size="large" htmlType="submit">
            <EditNavIcon /> {props.isUpdate ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
        {props.isUpdate && <Button onClick={onCancelUpdateClick}>Cancel</Button>}
      </Form>
    </div>
  );
};

export default EntryTypeForm;
