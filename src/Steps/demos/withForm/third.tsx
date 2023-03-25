import { DatePicker, Form, Input, message } from 'antd';
import { Steps } from 'l-idea';
import React from 'react';

export default () => {
  const form = Form.useFormInstance();

  Steps.useFooterEffect(
    ({ dispatch }) => {
      dispatch(-1);
    },
    [Steps.BUTTON_KEYS.PREV],
  );

  Steps.useFooterEffect(() => {
    message.success('完成');
    console.log(form.getFieldsValue(true));
  }, [Steps.BUTTON_KEYS.ACHIEVE]);

  return (
    <>
      <Form.Item name={['account', 'nickname']} label="nickname">
        <Input />
      </Form.Item>
      <Form.Item name={['account', 'birthday']} label="birthday">
        <DatePicker />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldsValue }) => (
          <pre
            style={{
              overflow: 'auto',
              margin: 12,
              height: 200,
              border: '1px solid #ddd',
            }}
          >
            {JSON.stringify(getFieldsValue(true), null, 2)}
          </pre>
        )}
      </Form.Item>
    </>
  );
};
