
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SoundEffect from '../SoundEffect';
import './timer.scss';
function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes ? minutes + ':' : ''}${seconds}`;
}
const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "warning"
  },
  alert: {
    color: "alert"
  }
};

const RADIUS = 40;




const SQTimer = ({ enableSound = true, className = '', timeLimit = 20, timePassed = 0, variant = 'line', size = 'default', threshhold = {
  warning: 10,
  alert: 5
} }) => {
  const [playSound, setPlaySound] = useState(false);
  const timeLeft = timeLimit - timePassed;
  function calculateTimeFraction() {
    return (timePassed) / timeLimit;
  }
  let remainingPathColor = '';
  let remainingCircleColor = '';
  if (timeLeft <= threshhold.alert) {
    if (variant === 'line') {
      remainingPathColor = COLOR_CODES.alert.color;
    } else {
      remainingCircleColor = COLOR_CODES.alert.color;
    }
  } else if (timeLeft <= threshhold.warning) {
    if (variant === 'line') {
      remainingPathColor = COLOR_CODES.warning.color;
    } else {
      remainingCircleColor = COLOR_CODES.warning.color;
    }
  } else {
    if (variant === 'line') {
      remainingPathColor = COLOR_CODES.info.color;
    } else {
      remainingCircleColor = COLOR_CODES.info.color;
    }
  }

  const targetAre = 2 * Math.PI * RADIUS;

  const circleDasharray = (`${(
    calculateTimeFraction() * targetAre
  ).toFixed(0)} ${targetAre}`);
  return (<div className={`sq-timer sq-timer--${size} ${className}`}>
    <div className="sq-timer__container">
      <SoundEffect name="ticktock" play={timeLeft <= threshhold.warning} />
      <svg className="sq-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="sq-timer__circle">
          <circle className={`sq-timer__path-elapsed ${remainingCircleColor}`} cx="50" cy="50" r={RADIUS} />
          <path
            id="sq-timer-path-remaining"
            strokeDasharray={circleDasharray}
            className={`sq-timer__path-remaining ${remainingPathColor}`}
            d={`M 50, 50
            m -${RADIUS}, 0
            a ${RADIUS},${RADIUS} 0 1,0 ${RADIUS * 2},0
            a ${RADIUS},${RADIUS} 0 1,0 -${RADIUS * 2},0`}
          ></path>
        </g>
      </svg>
      <span id="sq-timer-label" className="sq-timer__label">
        {formatTimeLeft(timeLimit - timePassed)}
      </span>
    </div>
  </div>);
};

SQTimer.propTypes = {
  enableSound: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  threshhold: PropTypes.object,
  timeLimit: PropTypes.number,
  timePassed: PropTypes.number
};

export default SQTimer;