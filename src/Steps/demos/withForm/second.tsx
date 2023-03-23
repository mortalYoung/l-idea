import { Descriptions, Form } from 'antd';
import { Steps } from 'l-idea';
import React from 'react';

export default () => {
  Steps.useFooterEffect(
    ({ dispatch }) => {
      dispatch(-1);
    },
    [Steps.BUTTON_KEYS.PREV],
  );

  Steps.useFooterEffect(
    ({ setLoading, dispatch }) => {
      setLoading(true);
      setTimeout(() => {
        Promise.resolve().finally(() => {
          setLoading(false);
          dispatch(1);
        });
      }, 200);
    },
    [Steps.BUTTON_KEYS.NEXT],
  );

  return (
    <div style={{ width: 350, margin: '12px auto' }}>
      <Form.Item noStyle dependencies={['name', 'gentle']}>
        {({ getFieldValue }) => (
          <Descriptions bordered>
            <Descriptions.Item label="姓名">
              {getFieldValue('name')}
            </Descriptions.Item>
            <Descriptions.Item label="性别">
              {getFieldValue('gentle').label}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Form.Item>
    </div>
  );
};
