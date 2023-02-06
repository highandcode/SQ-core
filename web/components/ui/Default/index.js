import React from 'react';
import PropTypes from 'prop-types';


const Default = ({ className, value }) => {
  return (
    <div className={`sq-Default ${className}`}>
      <span>{value}</span>
    </div>
  );
};
Default.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  row: PropTypes.object,
  tag: PropTypes.string,
  parentTag: PropTypes.string,
};

export default Default;
