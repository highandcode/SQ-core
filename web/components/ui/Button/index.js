import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Icon from '../../Icon';

import './_button.scss';

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
  const { disabled } = rest;
  const { click } = analytics;
  return (
    <div className={`sq-button ${className} ${size} ${!buttonText && iconName ? 'sq-button--icon-only' : ''}`}>
      <Button
        classes={{
          root: classes[size],
          label: classes.label
        }}
        onClick={(e) => {
          !disabled && onClick && onClick(e);
          !disabled && click && onAnalytics && onAnalytics(click);
        }}
        variant="contained"
        color="primary"
        {...rest}
      >
        {iconName && iconDirection === 'left' && <Icon name={iconName} size={iconSize || size} variant={iconColor || 'normal'} />}
        {buttonText}
        {iconName && iconDirection === 'right' && <Icon name={iconName} size={iconSize || size} variant={iconColor || 'normal'} />}
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

export default withStyles({
  normal: {
    padding: '15px 50px',
    minWidth: 200,
    fontSize: 14
  },
  large: {
    width: '100%',
    fontSize: 20,
    padding: '15px 50px',
    minWidth: 200
  },
  small: {
    padding: '4px 8px',
    fontSize: 12
  },
  auto: {
    // padding: '4px 8px',
    minWidth: 'auto',
    fontSize: 12
  },
  medium: {
    padding: '4px 18px',
    fontSize: 14
  },
  label: {
    textTransform: 'none'
  }
})(CustomButton);
