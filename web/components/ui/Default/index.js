import React from 'react';
import PropTypes from 'prop-types';
import './_default.scss';

const BasiText = ({ className = '', value }) => {
  return (
    <div className={`sq-default ${className}`}>
      {value.toString()}
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
