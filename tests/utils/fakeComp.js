import React from 'react';

export const createFakeComponent = () => {
  let _props;
  const fakeObj = {
    component: (props) => {
      _props = props;
      return <div className="fake-comp"></div>;
    },
    props: () => {
      return _props;
    }
  };
  return fakeObj;
}