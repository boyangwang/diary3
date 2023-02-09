import { Button, Form, Input, InputNumber, Radio } from 'antd';
import { EntryNavIcon } from './DiaryIcons';
import { RoutineEnum, EntryTypeThemeColors, getEntryTypeIds, EntryTypeConstructor } from '../app/types-constants';
import { useAppDispatch, useAppSelector } from '../app/store';
import EntryTypeList from './EntryTypeList';
import { createEntryType } from '../app/entry-types-slice';

const EntryTypeThemeColorsRadio = EntryTypeThemeColors.map((themeColorPair) => {
  return (
    <Radio.Button key={themeColorPair[0]} value={themeColorPair}>
      {JSON.stringify(themeColorPair)}
    </Radio.Button>
  );
});

const EntryTypeForm = () => {
  const { entryTypesArray } = useAppSelector((state) => state.entryTypes);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log('onValuesChange', changedValues, allValues);
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
    const entryType = EntryTypeConstructor(values);
    dispatch(createEntryType(entryType));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="entry-type-form"
        form={form}
        initialValues={{
          routine: RoutineEnum.none,
          themeColor: EntryTypeThemeColors[0][0],
          defaultPoints: 1,
          pointStep: 1,
        }}
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
                return getEntryTypeIds(entryTypesArray).includes(id)
                  ? Promise.reject('id already exists')
                  : Promise.resolve();
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

        <Form.Item name="routine" rules={[{ required: true, message: 'themeColor is required' }]}>
          <Radio.Group>
            <Radio.Button key={RoutineEnum.none} value={RoutineEnum.none}>
              None
            </Radio.Button>
            <Radio.Button key={RoutineEnum.daily} value={RoutineEnum.daily}>
              Daily
            </Radio.Button>
            <Radio.Button key={RoutineEnum.weekly} value={RoutineEnum.weekly}>
              Weekly
            </Radio.Button>
            <Radio.Button key={RoutineEnum.monthly} value={RoutineEnum.monthly}>
              Monthly
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="themeColors" rules={[{ required: true, message: 'themeColor is required' }]}>
          <Radio.Group>{EntryTypeThemeColorsRadio}</Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      <EntryTypeList entryTypeList={entryTypesArray}></EntryTypeList>
    </>
  );
};

export default EntryTypeForm;
