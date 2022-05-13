import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { withStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Icon from '../../Icon';
import './_button.scss';
const defaultTheme = createTheme();

const CustomButton = ({
  classes,
  className = '',
  actionValue,
  buttonText,
  iconName = '',
  iconSize,
  iconColor = '',
  iconDirection = 'left',
  size = 'normal',
  onClick,
  analytics = {},
  onAnalytics,
  children,
  ...rest
}) => {
  const { disabled, variant = 'contained', color = 'primary', startIcon, endIcon, disableRipple, disableFocusRipple, href } = rest;
  const { click } = analytics;
  return (
    <div className={`sq-button ${className} ${size} ${!buttonText && iconName ? 'sq-button--icon-only' : ''}`}>
      <ThemeProvider theme={defaultTheme}>
        <Button
       
        onClick={(e) => {
          !disabled && onClick && onClick(e);
          !disabled && click && onAnalytics && onAnalytics(click);
        }}
        href={href}
        variant={variant}
        disableFocusRipple={disableFocusRipple}
        disableRipple={disableRipple}
        startIcon={startIcon}
        endIcon={endIcon}
        color={color}
        disabled={Boolean(disabled)}
      >
        {iconName && iconDirection === 'left' && <Icon name={iconName} size={iconSize || size} variant={iconColor || 'normal'} />}
        {buttonText}
        {iconName && iconDirection === 'right' && <Icon name={iconName} size={iconSize || size} variant={iconColor || 'normal'} />}
        {children}
      </Button>
      </ThemeProvider>
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
