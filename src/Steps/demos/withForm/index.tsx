import { Button, Form } from 'antd';
import { Steps } from 'l-idea';
import React, { useState } from 'react';
import First from './first';
import Second from './second';
import Third from './third';

// 定义保存接口的服务端类型
interface IRecordProps {
  basicInfo: {
    id?: number;
    name: string;
    age: number;
    gentle: 'man' | 'woman';
    address?: string;
  };
  techInfo: {
    husband?: number;
    wife?: number;
    workFor: number;
  };
  account: {
    nickname?: string;
    birthday: number;
  };
}

export default () => {
  const [form] = Form.useForm<IRecordProps>();
  const [current, setCurrent] = useState('first');

  const getDetail = () => {
    form.setFieldsValue({
      basicInfo: {
        id: 1,
        name: 'xn',
        age: 18,
        gentle: 'man',
        address: 'Beijing',
      },
      techInfo: {
        workFor: 1,
      },
      account: {
        nickname: 'xn',
        birthday: (window as any).dayjs(new Date().valueOf()),
      },
    });
  };

  return (
    <Form
      layout="vertical"
      style={{ height: 500, marginBottom: 16 }}
      form={form}
    >
      <Steps
        current={current}
        onChange={setCurrent}
        extra={(current) =>
          current === 'first' && (
            <Button type="primary" ghost onClick={getDetail}>
              回填详情数据
            </Button>
          )
        }
        items={[
          {
            key: 'first',
            title: 'first',
            content: () => <First />,
          },
          {
            key: 'second',
            title: 'second',
            content: () => <Second />,
          },
          {
            key: 'third',
            title: 'third',
            content: () => <Third />,
          },
        ]}
      />
    </Form>
  );
};
