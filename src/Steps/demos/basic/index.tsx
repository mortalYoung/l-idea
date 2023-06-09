import { Steps } from 'l-idea';
import React, { useState } from 'react';
import First from './first';
import Second from './second';
import Third from './third';

export default () => {
  const [current, setCurrent] = useState('first');

  return (
    <div style={{ height: 500 }}>
      <Steps
        current={current}
        onChange={setCurrent}
        items={[
          {
            key: 'first',
            title: 'first',
            content: () => <First />,
          },
          {
            key: 'second',
            title: 'second',
            content: () => <Second />,
          },
          {
            key: 'third',
            title: 'third',
            content: () => <Third />,
          },
        ]}
      />
    </div>
  );
};
