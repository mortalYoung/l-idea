import { Form as StepsForm } from 'l-idea';
import React from 'react';

export default function Second() {
  StepsForm.useFooterEffect(
    ({ prev }) => {
      prev(() => {});
    },
    [StepsForm.PREV],
  );

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

  return <div>123</div>;
}
