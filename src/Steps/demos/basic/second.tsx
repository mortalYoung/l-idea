import { Steps } from 'l-idea';
import React from 'react';

export default () => {
  Steps.useFooterEffect(
    ({ dispatch }) => {
      dispatch(-1);
    },
    [Steps.BUTTON_KEYS.PREV],
  );

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

  return <div>second</div>;
};
