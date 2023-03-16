import { message } from 'antd';
import { useFooter } from 'l-idea';
import React from 'react';

export default () => {
  const { current, onCancel, onSubmit, setLoading, onChange } = useFooter();

  onCancel(() => {
    onChange(current - 1);
  });

  onSubmit(() => {
    setLoading(true);
    setTimeout(() => {
      Promise.resolve().finally(() => {
        setLoading(false);
        message.success('完成！');
      });
    }, 200);
  });

  return <div>third</div>;
};
