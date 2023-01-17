import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { redirectTo } from '../../../utils/redirect';
import Icon from '../../Icon';

const SQIconButton = ({
  to = '',
  title,
  variant = 'outlined',
  disabled,
  children,
  color = 'primary',
  className = '',
  onClick,
  size,
  iconSize = 'normal',
  iconName,
  urlParams,
  ...rest
}) => {
  const finalColor = disabled ? 'default' : color;
  let button = (
    <IconButton
      className={'sq-icon-button__button'}
      disabled={disabled}
      variant={variant}
      size={size}
      onClick={(e) => {
        !disabled && onClick && onClick(e);
        !disabled && to && redirectTo(to, urlParams, { ...rest });
      }}
    >
      <Icon
        className={`sq-icon--${variant}`}
        name={iconName}
        variant={finalColor}
        color={finalColor}
        size={iconSize}
      />
    </IconButton>
  );
  return (
    <div
      className={`sq-icon-button ${className} ${
        disabled ? 'sq-icon-button--disabled' : ''
      }`}
    >
      {!title && button}
      {title && (
        <Tooltip title={title}>
          <span>{button}</span>
        </Tooltip>
      )}
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
