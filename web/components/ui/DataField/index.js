import React from 'react';
import PropTypes from 'prop-types';

import './_data-field.scss';

const DataField = ({
  label,
  className = '',
  value = '',
  size = 'default',
  onClick,
  analytics = {},
  onAnalytics,
}) => {
  // const handleOnKeyPress = (evt) => {
  //   if (evt.key === 'Enter' || evt.key === 'Space') {
  //     !disabled && onClick && onClick(evt);
  //     !disabled && click && onAnalytics && onAnalytics(click);
  //   }
  // };

  // const { disabled } = rest;
  // const { click } = analytics;
  return (
    <div className={`sq-data-field ${className} sq-data-field--${size}`}>
      <label className="sq-data-field__label">{label}</label>
      <div className="sq-data-field__container">
        <div className="sq-data-field__value">{value || 'N/A'}</div>
      </div>
    </div>
  );
};

DataField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onAnalytics: PropTypes.func,
  analytics: PropTypes.object,
};

export default DataField;
