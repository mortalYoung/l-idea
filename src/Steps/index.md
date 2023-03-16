# Steps

<code src="./demos/basic/index.tsx" title="basic usage"></code>

```jsx
/**
 * title: usage with form
 */

import { Button, Steps } from 'l-idea';
import { Space } from 'antd';
import { useState } from 'react';

export default () => {
  const [form] = Steps.useForm();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ height: 500 }}>
      <Steps
        current={current}
        onChange={setCurrent}
        loading={loading}
        items={[
          {
            title: 'first',
            content: () => <div>1</div>,
          },
          {
            title: 'second',
            content: () => <div>2</div>,
          },
        ]}
      >
        {(current) => {
          switch (current) {
            case 0:
              return (
                <Button type="primary" onClick={() => setCurrent(current + 1)}>
                  Next
                </Button>
              );
            case 1:
              return (
                <Space size={8}>
                  <Button onClick={() => setCurrent(current - 1)}>Prev</Button>
                  <Button type="primary" loading={loading}>
                    Save
                  </Button>
                </Space>
              );

            default:
              break;
          }
        }}
      </Steps>
    </div>
  );
};
```
