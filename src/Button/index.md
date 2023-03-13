# Button

Extends From Ant Design's Button

```jsx
/**
 * title: common usage
 */
import { Button } from 'l-idea';

export default () => <Button type="primary">test</Button>;
```

## Different

```jsx
import { Button } from 'l-idea';
import { Button as AntdButton } from 'antd';

export default () => (
  <>
    <Button type="link">mine</Button>
    <AntdButton type="link">Ant Design</AntdButton>
  </>
);
```

## API

<details><summary>ButtonProps From Ant Design</summary><API id="Button"></API></details>
