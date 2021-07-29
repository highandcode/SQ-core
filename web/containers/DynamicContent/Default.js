import React from 'react';

const Default = ({ children, pageData }) => {
  return <div className={`sq-content-page ${pageData.className || ''}`}>{children}</div>;
};
export default Default;
