import { Button as RawButton, type ButtonProps } from 'antd';
import classnames from 'classnames';
import React from 'react';
import { prefix } from '../common';
import './index.less';

export default function Button({
  children,
  type,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <RawButton
      className={classnames(
        className,
        type === 'link' && `${prefix}link__button`,
      )}
      type={type}
      {...restProps}
    >
      {children}
    </RawButton>
  );
}
