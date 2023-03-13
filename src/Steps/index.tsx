import { Card, Form, Spin, Steps as RawSteps, type StepProps } from 'antd';
import React from 'react';
import './index.less';

interface IStepsProps {
  items: (StepProps & { content: () => React.ReactNode })[];
  current: number;
  loading: boolean;
  children: (current: number) => React.ReactNode;
  onChange: (current: number) => void;
}

function Steps({ loading, items, current, children, onChange }: IStepsProps) {
  return (
    <Card
      className="l-steps-container"
      hoverable={false}
      bodyStyle={{ padding: 0 }}
      style={{ boxShadow: 'none' }}
    >
      <RawSteps
        current={current}
        onChange={onChange}
        items={items}
        className="l-steps-header"
      />
      <Spin spinning={loading}>
        <div className="l-steps-content">{items[current].content()}</div>
      </Spin>
      {children && (
        <footer className="l-steps-footer">{children(current)}</footer>
      )}
    </Card>
  );
}

Steps.useForm = Form.useForm;

export default Steps;
