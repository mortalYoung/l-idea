import {
  Button,
  Card,
  Space,
  Spin,
  Steps as RawSteps,
  type StepProps,
} from 'antd';
import EventEmitter from 'eventemitter3';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';

const BUTTON_KEYS = {
  CANCEL: '$$cancel',
  PREV: '$$prev',
  NEXT: '$$next',
  ACHIEVE: '$$achieve',
} as const;

interface IStepsProps {
  items: (StepProps & {
    key: string;
    content: () => React.ReactNode;
  })[];
  current: string;
  extra?: (current: string) => React.ReactNode;
  onChange: (current: string) => void;
}

interface IContextProps {
  ee?: EventEmitter;
  current: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: (sign: number) => void;
  onChange: IStepsProps['onChange'];
}

const context = React.createContext<IContextProps>({
  ee: undefined,
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
      ctx.ee?.on(dep, tmpFunc);
    });

    return () => {
      deps.forEach((dep, idx) => {
        ctx.ee?.off(dep, persisFunc[idx]);
      });
    };
  }, []);
}

function Steps({ items, extra, current, onChange }: IStepsProps) {
  const [loading, setLoading] = useState(false);
  const ee = useRef(new EventEmitter());

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
      return (
        <Button onClick={() => ee.current.emit(BUTTON_KEYS.CANCEL)}>
          取消
        </Button>
      );
    }
    return (
      <Button onClick={() => ee.current.emit(BUTTON_KEYS.PREV)}>上一步</Button>
    );
  };

  const renderNext = () => {
    const stepsCurrent = items.findIndex((i) => i.key === current);
    if (stepsCurrent === items.length - 1) {
      return (
        <Button
          onClick={() => ee.current.emit(BUTTON_KEYS.ACHIEVE)}
          ghost
          type="primary"
        >
          完成
        </Button>
      );
    }
    return (
      <Button type="primary" onClick={() => ee.current.emit(BUTTON_KEYS.NEXT)}>
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
      value={{
        current,
        ee: ee.current,
        onChange,
        loading,
        dispatch,
        setLoading,
      }}
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
            {items[stepsCurrent]?.content()}
          </div>
        </Spin>
        <footer className="l-steps-footer">
          <Space size={8}>
            {renderPrev()}
            {extra?.(current)}
            {renderNext()}
          </Space>
        </footer>
      </Card>
    </context.Provider>
  );
}

Steps.useFooterEffect = useFooterEffect;
Steps.BUTTON_KEYS = BUTTON_KEYS;

export default Steps;
