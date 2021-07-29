import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Icon';

const TemplateDefault = ({ iconName, size, variant, buttonText }) => {
  return (
    <>
      {iconName && <Icon className="sq-custom-button__icon" name={iconName} size={size} variant={variant} />}
      <div className="sq-custom-button__text">{buttonText}</div>
    </>
  );
};

export default TemplateDefault;
