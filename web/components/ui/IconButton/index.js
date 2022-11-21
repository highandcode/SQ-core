import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { redirectTo } from '../../../utils/redirect';
import Icon from '../../Icon';

const SQIconButton = ({ to = '', disabled, children, color = 'primary', className = '', onClick, iconSize = 'small', iconName, urlParams, ...rest }) => {
  const finalColor = disabled ? 'default' : color;
  return (
    <div className={`sq-icon-button ${disabled ? 'sq-icon-button--disabled' : ''}`}>
      <IconButton
        className={className}
        disabled={disabled}
        onClick={(e) => {
          !disabled && onClick && onClick(e);
          !disabled && to && redirectTo(to, urlParams, { ...rest });
        }}
      >
        <Icon name={iconName} variant={finalColor} color={finalColor} size={iconSize} />
      </IconButton>
    </div>
  );
};
SQIconButton.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  iconSize: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  iconName: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

export default SQIconButton;
