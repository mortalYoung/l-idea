import { useFooter } from 'l-idea';
import React from 'react';

export default () => {
  const { onNext, setLoading, onChange } = useFooter();

  onNext(() => {
    setLoading(true);
    setTimeout(() => {
      Promise.resolve().finally(() => {
        setLoading(false);
        onChange(1);
      });
    }, 200);
  });

  return <div>first</div>;
};
