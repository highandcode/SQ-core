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
    <div className={`sq-button ${className} ${size}`}>
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
        {iconName && iconDirection === 'left' && <Icon name={iconName} size={size} variant={iconColor || 'normal'} />}
        {buttonText}
        {iconName && iconDirection === 'right' && <Icon name={iconName} size={size} variant={iconColor || 'normal'} />}
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
    margin: '0 5px 0 0',
    padding: '15px 50px',
    // borderRadius: '12px',
    minWidth: 200,
    fontSize: 14
  },
  large: {
    margin: '0 5px 0 0',
    width: '100%',
    fontSize: 20,
    padding: '15px 50px',
    // borderRadius: '12px',
    minWidth: 200
  },
  small: {
    margin: '0 5px 0 0',
    // borderRadius: '10px',
    padding: '4px 8px',
    fontSize: 12
  },
  medium: {
    margin: '0 5px 0 0',
    // borderRadius: '10px',
    padding: '4px 18px',
    fontSize: 14
  },
  label: {
    textTransform: 'capitalize'
  }
})(CustomButton);
