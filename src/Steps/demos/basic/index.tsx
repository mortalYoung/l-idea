import { Steps } from 'l-idea';
import React, { useState } from 'react';
import First from './first';
import Second from './second';
import Third from './third';

export default () => {
  const [current, setCurrent] = useState(0);

  return (
    <div style={{ height: 500 }}>
      <Steps
        current={current}
        onChange={setCurrent}
        items={[
          {
            title: 'first',
            content: () => <First />,
            footer: (_, next) => <>{next}</>,
          },
          {
            title: 'second',
            content: () => <Second />,
            footer: (prev, next) => (
              <>
                {prev}
                {next}
              </>
            ),
          },
          {
            title: 'third',
            content: () => <Third />,
            footer: (prev, _, achieve) => (
              <>
                {prev}
                {achieve}
              </>
            ),
          },
        ]}
      />
    </div>
  );
};
