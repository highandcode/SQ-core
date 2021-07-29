import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '../Icon';
import { getValue } from '../../utils/properties';

import './fab-button.scss';

const SQFloatingActionButton = ({
  className = '',
  label,
  iconName = 'add',
  disabled,
  color = 'primary',
  position = 'bottom-right',
  onClick,
  size
}) => {
  const handleClick = (e) => {
    onClick && onClick(e);
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
  onClick: PropTypes.func
};

export default SQFloatingActionButton;
