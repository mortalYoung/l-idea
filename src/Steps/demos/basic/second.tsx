import { useFooter } from 'l-idea';
import React from 'react';

export default () => {
  const { current, onCancel, onNext, setLoading, onChange } = useFooter();

  onCancel(() => {
    onChange(current - 1);
  });

  onNext(() => {
    setLoading(true);
    setTimeout(() => {
      Promise.resolve().finally(() => {
        setLoading(false);
        onChange(current + 1);
      });
    }, 200);
  });

  return <div>second</div>;
};
