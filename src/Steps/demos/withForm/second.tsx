import { Descriptions, Form, Select } from 'antd';
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
      <Form.Item noStyle dependencies={['basicInfo']}>
        {({ getFieldValue }) => (
          <Descriptions bordered>
            <Descriptions.Item label="姓名">
              {getFieldValue(['basicInfo', 'name'])}
            </Descriptions.Item>
            <Descriptions.Item label="性别">
              {getFieldValue(['basicInfo', 'gentle'])}
            </Descriptions.Item>
            <Descriptions.Item label="年龄">
              {getFieldValue(['basicInfo', 'age'])}
            </Descriptions.Item>
            <Descriptions.Item label="地址">
              {getFieldValue(['basicInfo', 'address'])}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Form.Item>
      <Form.Item noStyle dependencies={[['basicInfo', 'gentle']]}>
        {({ getFieldValue }) => {
          const gentle = getFieldValue(['basicInfo', 'gentle']);
          switch (gentle) {
            case 'man':
              return (
                <Form.Item label="wife" name={['techInfo', 'wife']}>
                  <Select
                    allowClear
                    options={[
                      {
                        value: 1,
                        label: 'wife1',
                      },
                    ]}
                  />
                </Form.Item>
              );
            case 'woman':
              return (
                <Form.Item label="husband" name={['techInfo', 'husband']}>
                  <Select
                    allowClear
                    options={[
                      {
                        value: 1,
                        label: 'husband1',
                      },
                    ]}
                  />
                </Form.Item>
              );

            default:
              return null;
          }
        }}
      </Form.Item>
      <Form.Item label="工作" name={['techInfo', 'workFor']} initialValue={1}>
        <Select
          options={[
            {
              label: 'dtstack',
              value: 1,
            },
          ]}
        />
      </Form.Item>
    </>
  );
};
