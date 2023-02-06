import React from 'react';
import PropTypes from 'prop-types';


const BasiText = ({ className, value }) => {
  return (
    <div className={`sq-default ${className}`}>
      <span>{value.toString()}</span>
    </div>
  );
};
BasiText.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  row: PropTypes.object,
  tag: PropTypes.string,
  parentTag: PropTypes.string,
};

export default BasiText;
