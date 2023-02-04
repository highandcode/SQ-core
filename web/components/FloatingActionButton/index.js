import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import { makeStyles } from '@mui/material/styles';
import Icon from '../Icon';
import { getValue } from '../../utils/properties';


const SQFloatingActionButton = ({
  className = '',
  label,
  iconName = 'add',
  disabled,
  color = 'primary',
  position = 'bottom-right',
  onClick,
  analytics = {},
  onAnalytics,
  size
}) => {
  const handleClick = (e) => {
    const { click } = analytics;
    onClick && onClick(e);
    click && onAnalytics(click);
  };

  return (
    <Fab className={`sq-fab-button ${className} ${position}`} color={color} aria-label={label} disabled={disabled} onClick={handleClick}>
      {<Icon name={iconName} size={size} variant="white" />}
    </Fab>
  );
};

SQFloatingActionButton.propTypes = {
  buttonText: PropTypes.string,
  className: PropTypes.string,
  onAnalytics: PropTypes.func,
  onClick: PropTypes.func
};

export default SQFloatingActionButton;
