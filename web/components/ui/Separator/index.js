import React from 'react';
import PropTypes from 'prop-types';
import './_separator.scss';

const Separator = ({ className = '' }) => {
  return <div className={`sq-separator-cmp ${className}`}></div>;
};
Separator.propTypes = {
  className: PropTypes.string
};

export default Separator;
