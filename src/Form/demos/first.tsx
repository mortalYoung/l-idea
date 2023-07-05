import { Col, Form, Input, message, Row } from 'antd';
import { Form as StepsForm } from 'l-idea';
import React from 'react';

export default function First() {
  StepsForm.useFooterEffect(() => {
    message.error("hashHistory.push('/')");
  }, [StepsForm.PREV]);

  StepsForm.useFooterEffect(
    ({ next, form }) => {
      next(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            form?.validateFields().then((values) => {
              console.log(values);
              resolve();
            });
          }, 1000);
        });
      });
    },
    [StepsForm.NEXT],
  );

  return (
    <Row gutter={16} style={{ padding: 16 }}>
      <Col span={12}>
        <Form.Item name="modelName" label="模型名称">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="modelCode" label="模型编码">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="desc" label="描述">
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
}
