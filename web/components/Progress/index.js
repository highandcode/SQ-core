import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import RoundProgress from './round-progress';
import CubeProgress from './cube-progress';
import Ripple from './ripple';
import './progress.scss';

const _types = {
  default: CircularProgress,
  circle: LinearProgress,
  cube: CubeProgress,
  round: RoundProgress,
  ripple: Ripple
};

const Progress = ({ type = 'default', style = 'full-screen', text = '', color = 'primary', overlay = true, value, className = '' }) => {
  const CompToRender = _types[type];
  return (
    <div className={`tp-progress ${className} tp-progress--${style}`}>
      <CompToRender className="tp-progress__spinner" color={color} />
      {overlay && <div className="tp-progress__overlay"></div>}
      {text && <div className="tp-progress__text">{text}</div>}
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string
};

export default Progress;
