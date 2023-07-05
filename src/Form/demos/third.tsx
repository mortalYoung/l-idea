import { message } from 'antd';
import { Form as StepsForm } from 'l-idea';
import React from 'react';
import { PREVIEW } from './basic';

export default function Third() {
  StepsForm.useFooterEffect(
    ({ prev }) => {
      prev(() => {});
    },
    [StepsForm.PREV],
  );

  StepsForm.useFooterEffect(() => {
    message.info('预览');
  }, [PREVIEW]);

  StepsForm.useFooterEffect(
    ({ next }) => {
      next(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      });
    },
    [StepsForm.NEXT],
  );

  return <div>第三部</div>;
}
