import {
  Button,
  Card,
  Form,
  FormInstance,
  Space,
  Spin,
  Steps as RawSteps,
  type StepProps,
} from 'antd';
import EventEmitter from 'eventemitter3';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';

const ee = new EventEmitter();

const BUTTON_KEYS = {
  CANCEL: '$$cancel',
  PREV: '$$prev',
  NEXT: '$$next',
  ACHIEVE: '$$achieve',
} as const;

interface IStepsProps {
  form?: FormInstance;
  items: (StepProps & {
    key: string;
    content: () => React.ReactNode;
  })[];
  current: string;
  onChange: (current: string) => void;
}

interface IContextProps {
  form?: FormInstance;
  current: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: (sign: number) => void;
  onChange: IStepsProps['onChange'];
}

const context = React.createContext<IContextProps>({
  current: '',
  loading: false,
  setLoading: () => {},
  dispatch: () => {},
  onChange: () => {},
});

function useFooterEffect(effect: (ctx: IContextProps) => void, deps: string[]) {
  const ctx = useContext(context);
  const func = useRef(effect);

  useEffect(() => {
    func.current = effect;
  });

  useEffect(() => {
    const persisFunc: (() => void)[] = [];
    deps.forEach((dep) => {
      const tmpFunc = () => func.current(ctx);
      persisFunc.push(tmpFunc);
      ee.on(dep, tmpFunc);
    });

    return () => {
      deps.forEach((dep, idx) => {
        ee.off(dep, persisFunc[idx]);
      });
    };
  }, []);
}

function FormContainer({
  form,
  children,
}: {
  form?: FormInstance;
  children: React.ReactNode;
}) {
  return form ? (
    <Form validateTrigger="onBlur" layout="vertical" form={form}>
      {children}
    </Form>
  ) : (
    <>{children}</>
  );
}

function Steps({ form, items, current, onChange }: IStepsProps) {
  const [loading, setLoading] = useState(false);

  const dispatch = (sign: number) => {
    if (sign === 0) return;
    const stepsCurrent = items.findIndex((i) => i.key === current);
    // 如果没有对应步骤，大于 0 则兜底最后一步，小于 0 则兜底第一步
    const next = items[stepsCurrent + sign] || items.at(sign > 0 ? -1 : 0);
    onChange(next.key);
  };

  const renderPrev = () => {
    const stepsCurrent = items.findIndex((i) => i.key === current);
    if (stepsCurrent === 0) {
      return <Button onClick={() => ee.emit(BUTTON_KEYS.CANCEL)}>取消</Button>;
    }
    return <Button onClick={() => ee.emit(BUTTON_KEYS.PREV)}>上一步</Button>;
  };

  const renderNext = () => {
    const stepsCurrent = items.findIndex((i) => i.key === current);
    if (stepsCurrent === items.length - 1) {
      return (
        <Button
          onClick={() => ee.emit(BUTTON_KEYS.ACHIEVE)}
          ghost
          type="primary"
        >
          完成
        </Button>
      );
    }
    return (
      <Button type="primary" onClick={() => ee.emit(BUTTON_KEYS.NEXT)}>
        下一步
      </Button>
    );
  };

  const stepsCurrent = useMemo(
    () => items.findIndex((i) => i.key === current),
    [current, items],
  );

  return (
    <context.Provider
      value={{ current, form, onChange, loading, dispatch, setLoading }}
    >
      <Card
        className="l-steps-container"
        hoverable={false}
        bodyStyle={{ padding: 0 }}
        style={{ boxShadow: 'none' }}
      >
        <RawSteps
          current={stepsCurrent}
          onChange={(idx) => onChange(items[idx]?.key)}
          items={items}
          className="l-steps-header"
        />
        <Spin spinning={loading}>
          <div className="l-steps-content">
            <FormContainer form={form}>
              {items[stepsCurrent]?.content()}
            </FormContainer>
          </div>
        </Spin>
        <footer className="l-steps-footer">
          <Space size={8}>
            {renderPrev()}
            {renderNext()}
          </Space>
        </footer>
      </Card>
    </context.Provider>
  );
}

Steps.useForm = Form.useForm;
Steps.useFooterEffect = useFooterEffect;
Steps.BUTTON_KEYS = BUTTON_KEYS;

export default Steps;
