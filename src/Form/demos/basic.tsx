import { Form as StepsForm } from 'l-idea';
import React, { useState } from 'react';
import First from './first';
import Second from './second';
import Third from './third';

enum StepsKind {
  basicInfo = 0,
  reletion,
  dimension,
  metric,
  setting,
}

export const PREVIEW = Symbol('PREVIEW');

export default () => {
  const [form] = StepsForm.useForm();
  const [current, setCurrent] = useState(StepsKind.basicInfo);

  return (
    <div style={{ height: '100vh' }}>
      <StepsForm
        form={form}
        layout="vertical"
        autoComplete="off"
        current={current}
        onChange={setCurrent}
        titles={['基础信息', '关联表', '选择维度', '选择度量', '设置']}
        submitter={[
          {
            [StepsForm.PREV]: {
              children: '取消',
            },
          },
          null,
          {
            [PREVIEW]: {
              danger: true,
              children: '预览',
            },
          },
        ]}
      >
        <First />
        <Second />
        <Third />
        <div>4</div>
        <div>5</div>
      </StepsForm>
    </div>
  );
};
