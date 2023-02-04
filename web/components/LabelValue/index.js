import React from 'react';
import PropTypes from 'prop-types';

import { getMap } from '../ui/index';
let supportedComponents = getMap();

export const registerComponents = (newComps) => {
  supportedComponents = {
    ...supportedComponents,
    ...newComps
  };
};
const LabelValue = ({ label = '', value = '', className = '' }) => {
  return (
    <div className={`sq-label-value ${className}`}>
      <div className="sq-label-value__label">{label}</div>
      <div className="sq-label-value__value">{value}</div>
    </div>
  );
};

LabelValue.propTypes = {
  data: PropTypes.object,
  label: PropTypes.string
};

export default LabelValue;
