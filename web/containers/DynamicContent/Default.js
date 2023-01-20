import React from 'react';

const Default = ({ children, pageData }) => {
  return <div className={`sq-content-page ${pageData.wrapperClassName || ''}`}>{children}</div>;
};
export default Default;
