import { message } from 'antd';
import { Steps } from 'l-idea';
import React from 'react';

export default () => {
  Steps.useFooterEffect(() => {
    message.warning('点击了取消');
  }, [Steps.BUTTON_KEYS.CANCEL]);

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

  return <div>first</div>;
};
