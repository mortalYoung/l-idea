import {
  Button,
  Card,
  Form,
  Space,
  Spin,
  Steps as RawSteps,
  type ButtonProps,
  type StepProps,
} from 'antd';
import EventEmitter from 'eventemitter3';
import React, { useContext, useEffect, useRef, useState } from 'react';
import './index.less';

const ee = new EventEmitter();

export const BUTTON_KEYS = {
  PREV: '$$prev',
  NEXT: '$$next',
  ACHIEVE: '$$achieve',
} as const;

interface IStepsProps {
  items: (StepProps & {
    content: () => React.ReactNode;
    footer: (
      PREV: JSX.Element,
      NEXT: JSX.Element,
      ACHIEVE: JSX.Element,
    ) => React.ReactNode;
  })[];
  buttonProps?: {
    [BUTTON_KEYS.PREV]?: Pick<ButtonProps, 'type' | 'className' | 'children'>;
    [BUTTON_KEYS.NEXT]?: Pick<ButtonProps, 'type' | 'className' | 'children'>;
    [BUTTON_KEYS.ACHIEVE]?: Pick<
      ButtonProps,
      'type' | 'className' | 'children'
    >;
  };
  current: number;
  onChange: (current: number) => void;
}

const context = React.createContext<{
  current: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: IStepsProps['onChange'];
}>({ current: 1, loading: false, setLoading: () => {}, onChange: () => {} });

export const useFooter = () => {
  const ctx = useContext(context);
  const lastFunc = useRef<{
    onCancel: null | (() => void);
    onNext: null | (() => void);
    onSubmit: null | (() => void);
  }>({
    onCancel: null,
    onNext: null,
    onSubmit: null,
  });
  const onCancel = (func: () => Promise<boolean> | void) => {
    if (!func) return;
    if (lastFunc.current.onCancel) {
      ee.off(BUTTON_KEYS.PREV, lastFunc.current.onCancel);
    }
    ee.on(BUTTON_KEYS.PREV, func);
    lastFunc.current.onCancel = func;
  };

  const onNext = (func: () => Promise<boolean> | void) => {
    if (!func) return;
    if (lastFunc.current.onNext) {
      ee.off(BUTTON_KEYS.NEXT, lastFunc.current.onNext);
    }
    ee.on(BUTTON_KEYS.NEXT, func);
    lastFunc.current.onNext = func;
  };

  const onSubmit = (func: () => Promise<boolean> | void) => {
    if (!func) return;
    if (lastFunc.current.onSubmit) {
      ee.off(BUTTON_KEYS.ACHIEVE, lastFunc.current.onSubmit);
    }
    ee.on(BUTTON_KEYS.ACHIEVE, func);
    lastFunc.current.onSubmit = func;
  };

  useEffect(() => {
    return () => {
      if (lastFunc.current.onCancel)
        ee.off(BUTTON_KEYS.PREV, lastFunc.current.onCancel);
      if (lastFunc.current.onNext)
        ee.off(BUTTON_KEYS.NEXT, lastFunc.current.onNext);
      if (lastFunc.current.onSubmit)
        ee.off(BUTTON_KEYS.ACHIEVE, lastFunc.current.onSubmit);
    };
  }, []);

  return {
    ...ctx,
    onCancel,
    onNext,
    onSubmit,
  };
};

function Steps({ items, current, buttonProps, onChange }: IStepsProps) {
  const [loading, setLoading] = useState(false);

  const { children: prevChildren, ...restPrevProps } =
    buttonProps?.[BUTTON_KEYS.PREV] || {};
  const PREV_BUTTON = (
    <Button
      onClick={() => {
        ee.emit(BUTTON_KEYS.PREV);
      }}
      {...restPrevProps}
    >
      {prevChildren || '上一步'}
    </Button>
  );

  const { children: nextChildren, ...restNextProps } =
    buttonProps?.[BUTTON_KEYS.NEXT] || {};
  const NEXT_BUTTON = (
    <Button
      type="primary"
      loading={loading}
      onClick={() => {
        ee.emit(BUTTON_KEYS.NEXT);
      }}
      {...restNextProps}
    >
      {nextChildren || '下一步'}
    </Button>
  );

  const { children: achieveChildren, ...restAchieveProps } =
    buttonProps?.[BUTTON_KEYS.NEXT] || {};
  const ACHIEVE_BUTTON = (
    <Button
      type="primary"
      loading={loading}
      onClick={() => {
        ee.emit(BUTTON_KEYS.ACHIEVE);
      }}
      {...restAchieveProps}
    >
      {achieveChildren || '完成'}
    </Button>
  );

  return (
    <context.Provider value={{ current, onChange, loading, setLoading }}>
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
        <footer className="l-steps-footer">
          <Space size={8}>
            {items[current].footer?.(PREV_BUTTON, NEXT_BUTTON, ACHIEVE_BUTTON)}
          </Space>
        </footer>
      </Card>
    </context.Provider>
  );
}

Steps.useForm = Form.useForm;

export default Steps;
