import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { idFromLabel } from '../../../utils/properties';
import { Button } from '@mui/material';
import Icon from '../../Icon';
import './_button.scss';

const CustomButton = ({
  className = '',
  actionValue,
  buttonText,
  iconName = '',
  iconSize = 'normal',
  iconColor = '',
  iconDirection = 'left',
  size = 'medium',
  onClick,
  analytics = {},
  onAnalytics,
  children,
  ...rest
}) => {
  const { disabled, variant = 'contained', color = 'primary', startIcon, endIcon, disableRipple, disableFocusRipple, href } = rest;
  const { click } = analytics;
  const testId = idFromLabel(buttonText);
  return (
    <div className={`sq-button ${className} ${size} ${!buttonText && iconName ? 'sq-button--icon-only' : ''}`} data-testid={testId}>
        <Button
        onClick={(e) => {
          !disabled && onClick && onClick(e);
          !disabled && click && onAnalytics && onAnalytics(click);
        }}
        data-testid={`${testId}_button`}
        size={size}
        href={href}
        variant={variant}
        disableFocusRipple={disableFocusRipple}
        disableRipple={disableRipple}
        startIcon={startIcon}
        endIcon={endIcon}
        color={color}
        disabled={Boolean(disabled)}
      >
        {iconName && iconDirection === 'left' && <Icon className='left' name={iconName} size={iconSize || size} variant={iconColor || 'normal'} />}
        {buttonText}
        {iconName && iconDirection === 'right' && <Icon className='right' name={iconName} size={iconSize || size} variant={iconColor || 'normal'} />}
        {children}
      </Button>
    </div>
  );
};
CustomButton.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.string,
  actionValue: PropTypes.string,
  onAnalytics: PropTypes.func,
  analytics: PropTypes.object,
  buttonText: PropTypes.string,
  iconName: PropTypes.string
};

export default CustomButton;
