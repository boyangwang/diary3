import React from 'react';
import { Button, Form, Input, InputNumber, Radio } from 'antd';
import { EntryNavIcon } from './DiaryIcons';
import { RoutineEnum, EntryTypeThemeColors } from '../types-constants';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const EntryTypeThemeColorsRadio = EntryTypeThemeColors.map((themeColorPair) => {
  return (
    <Radio.Button key={themeColorPair[0]} value={themeColorPair[0]}>
      {JSON.stringify(themeColorPair)}
    </Radio.Button>
  );
});

const EntryTypeForm: React.FC = () => (
  <Form
    name="entry-type-form"
    initialValues={{
      routine: RoutineEnum.none,
      themeColor: EntryTypeThemeColors[0][0],
      defaultPoints: 1,
      pointStep: 1,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item name="title" rules={[{ required: true, message: 'title is required' }]}>
      <Input placeholder="Title" prefix={<EntryNavIcon />} />
    </Form.Item>

    <Form.Item name="defaultPoints" rules={[{ required: true, message: 'defaultPoints is required' }]}>
      <InputNumber min={-60} max={60} step={0.5} size="large" />
    </Form.Item>
    <Form.Item name="pointStep" rules={[{ required: true, message: 'pointStep is required' }]}>
      <InputNumber min={-60} max={60} step={0.5} size="large" />
    </Form.Item>

    <Form.Item name="routine">
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

    <Form.Item name="themeColor">
      <Radio.Group>{EntryTypeThemeColorsRadio}</Radio.Group>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form.Item>
  </Form>
);

export default EntryTypeForm;
