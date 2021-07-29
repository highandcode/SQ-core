import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import './_progress-indicator.scss';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: 10
    }
  };
});

const _configRange = [
  {
    min: 80,
    className: 'red'
  },
  {
    min: 50,
    className: 'orange'
  },
  {
    min: 0,
    className: 'green'
  }
];

const ProgressIndicator = ({ variant = 'determinate', color = 'primary', value = 0, className = '' }) => {
  const finalValue = value > 100 ? 100 : value || 0;
  let colorToApply;
  _configRange.forEach((item) => {
    if (!colorToApply && value >= item.min) {
      colorToApply = item.className;
      return false;
    }
  });
  const classes = useStyles();
  return (
    <div className={`sq-progress-indicator ${className} sq-progress-indicator--${colorToApply}`}>
      <div className="sq-progress-indicator__container">
        <div className="sq-progress-indicator__bar">
          <LinearProgress className={`sq-progress-indicator__progress-bar`} classes={classes} color={color} variant={variant} value={finalValue} />
        </div>
        <div className="sq-progress-indicator__label">
          {finalValue.toString()}
          {finalValue < value * 1 ? '+' : ''}%
        </div>
      </div>
    </div>
  );
};

ProgressIndicator.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string
};

export default ProgressIndicator;
