import {
  Button,
  ButtonProps,
  Card,
  Form as RawForm,
  FormInstance,
  FormProps,
  Space,
  Steps,
  StepsProps,
} from 'antd';
import EventEmitter from 'eventemitter3';
import React, { useContext, useEffect, useRef, useState } from 'react';
import './index.less';

const BUTTON_KEYS = {
  PREV: Symbol('PREV'),
  NEXT: Symbol('NEXT'),
} as const;

interface IFormProps
  extends Omit<FormProps, 'onChange' | 'children'>,
    Pick<StepsProps, 'current' | 'onChange'> {
  titles: string[];
  children: React.ReactElement[];
  submitter?: (Record<symbol, ButtonProps> | null)[];
}

interface IContextProps {
  ee: EventEmitter;
  current?: number;
  form?: FormInstance;
  prev: (func: () => Promise<void> | void) => void;
  next: (func: () => Promise<void> | void) => void;
}

const context = React.createContext<IContextProps>({
  ee: new EventEmitter(),
  prev: () => {},
  next: () => {},
});

function useFooterEffect(effect: (ctx: IContextProps) => void, deps: symbol[]) {
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
      console.log(dep.toString());
      ctx.ee?.on(dep.toString(), tmpFunc);
    });

    return () => {
      deps.forEach((dep, idx) => {
        ctx.ee?.off(dep.toString(), persisFunc[idx]);
      });
    };
  }, []);
}

function Form({
  titles,
  current,
  submitter,
  onChange,
  children,
  ...rest
}: IFormProps) {
  const ee = useRef(new EventEmitter());
  const [[pLoading, nLoading], setLoading] = useState([false, false]);

  const assertCurrent = (current?: number): current is number =>
    current !== undefined;

  const handlePrev = (fn: () => Promise<void> | void) => {
    setLoading([true, false]);
    Promise.resolve(fn())
      .then(() => {
        if (assertCurrent(current)) {
          onChange?.(current - 1);
        }
      })
      .finally(() => {
        setLoading([false, false]);
      });
  };

  const handleNext = (fn: () => Promise<void> | void) => {
    setLoading([false, true]);
    Promise.resolve(fn())
      .then(() => {
        if (assertCurrent(current)) {
          onChange?.(current + 1);
        }
      })
      .finally(() => {
        setLoading([false, false]);
      });
  };

  if (!assertCurrent(current)) return null;

  const curSubmitter = submitter?.[current] || {};
  const { children: prevChild = '上一步', ...restPrev } =
    curSubmitter[BUTTON_KEYS.PREV] || {};
  const { children: nextChild = '下一步', ...restNext } =
    curSubmitter[BUTTON_KEYS.NEXT] || {};

  const renderExtra = () => {
    return Reflect.ownKeys(curSubmitter)
      .filter((i) => i !== BUTTON_KEYS.PREV)
      .map((i) => {
        const { children, ...restProps } = curSubmitter[i as symbol];
        return (
          <Button
            {...restProps}
            key={i.toString()}
            onClick={() => {
              ee.current.emit(i.toString());
            }}
          >
            {children}
          </Button>
        );
      });
  };

  return (
    <context.Provider
      value={{
        ee: ee.current,
        current,
        form: rest.form,
        prev: handlePrev,
        next: handleNext,
      }}
    >
      <Card
        className="container"
        hoverable={false}
        bodyStyle={{ padding: 0 }}
        style={{ boxShadow: 'none' }}
      >
        <RawForm {...rest}>
          <Steps
            current={current}
            onChange={onChange}
            className="header"
            items={titles.map((i) => ({ title: i }))}
          />
          <section className="content">{children[current]}</section>
          <footer className="footer">
            <Space size={16}>
              <Button
                loading={pLoading}
                {...restPrev}
                onClick={() => ee.current.emit(BUTTON_KEYS.PREV.toString())}
              >
                {prevChild}
              </Button>
              {renderExtra()}
              <Button
                type="primary"
                loading={nLoading}
                {...restNext}
                onClick={() => ee.current.emit(BUTTON_KEYS.NEXT.toString())}
              >
                {nextChild}
              </Button>
            </Space>
          </footer>
        </RawForm>
      </Card>
    </context.Provider>
  );
}

Form.useForm = RawForm.useForm;
Form.useFormInstance = RawForm.useFormInstance;
Form.useFooterEffect = useFooterEffect;
Form.PREV = BUTTON_KEYS.PREV;
Form.NEXT = BUTTON_KEYS.NEXT;

export default Form;
