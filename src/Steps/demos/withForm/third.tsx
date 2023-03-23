import { message } from 'antd';
import { Steps } from 'l-idea';
import React from 'react';

export default () => {
  Steps.useFooterEffect(
    ({ dispatch }) => {
      dispatch(-1);
    },
    [Steps.BUTTON_KEYS.PREV],
  );

  Steps.useFooterEffect(() => {
    message.success('完成');
  }, [Steps.BUTTON_KEYS.ACHIEVE]);

  return <div>third</div>;
};
