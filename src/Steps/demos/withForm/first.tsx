import { Form, Input, message, Select } from 'antd';
import { Steps } from 'l-idea';
import React from 'react';

export default () => {
  Steps.useFooterEffect(() => {
    message.warning('点击了取消');
  }, [Steps.BUTTON_KEYS.CANCEL]);

  Steps.useFooterEffect(
    ({ setLoading, form, dispatch }) => {
      setLoading(true);
      form
        ?.validateFields()
        .then((values) => {
          console.log(values);
          dispatch(1);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [Steps.BUTTON_KEYS.NEXT],
  );

  return (
    <div style={{ width: 250, margin: '12px auto' }}>
      <Form.Item
        name="name"
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
        name="gentle"
        label="性别"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          allowClear
          labelInValue
          options={[
            { label: '男', value: 'man' },
            { label: '女', value: 'women' },
          ]}
        />
      </Form.Item>
    </div>
  );
};
