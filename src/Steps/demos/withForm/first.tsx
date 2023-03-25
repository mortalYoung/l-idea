import { Form, Input, InputNumber, message, Select } from 'antd';
import { Steps } from 'l-idea';
import React from 'react';

export default () => {
  const form = Form.useFormInstance();

  Steps.useFooterEffect(() => {
    message.warning('点击了取消');
  }, [Steps.BUTTON_KEYS.CANCEL]);

  Steps.useFooterEffect(
    ({ setLoading, dispatch }) => {
      setLoading(true);
      form
        .validateFields()
        .then(() => {
          dispatch(1);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [Steps.BUTTON_KEYS.NEXT],
  );

  return (
    <>
      <Form.Item
        name={['basicInfo', 'name']}
        label="名称"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['basicInfo', 'age']}
        label="年龄"
        rules={[
          {
            required: true,
          },
        ]}
        initialValue={0}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name={['basicInfo', 'gentle']}
        label="性别"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          allowClear
          options={[
            { label: '男', value: 'man' },
            { label: '女', value: 'woman' },
          ]}
        />
      </Form.Item>
      <Form.Item name={['basicInfo', 'address']} label="地址">
        <Input.TextArea />
      </Form.Item>
    </>
  );
};
