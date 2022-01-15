import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getValue } from '../../utils/properties';
import './icon-calendar.scss';

const IconCalendar = ({ className = '', img, textIcon, name, value, yearFormat = 'YY', variant = 'default', size = 'normal', iconClass = '', row, svg, onClick }) => {
  const day = moment(value).format('DD');
  const month = moment(value).format('MMM');
  const year = moment(value).format(yearFormat);
  return (
    <div
      className={`sq-icon-calendar sq-icon-calendar--${typeof variant === 'function' ? variant(row) : variant} sq-icon-calendar--${size} ${className}`}
      onClick={onClick}
    >
      <div className="sq-icon-calendar__day">
        {day}
      </div>
      <div className="sq-icon-calendar__month">
        {month}{'\''}{year}
      </div>
    </div>
  );
};

IconCalendar.propTypes = {
  name: PropTypes.any,
  svg: PropTypes.node,
  className: PropTypes.string,
  row: PropTypes.object,
  textIcon: PropTypes.any,
  onClick: PropTypes.func,
  variant: PropTypes.any,
  value: PropTypes.any,
  classes: PropTypes.object,
  size: PropTypes.string
};

export default IconCalendar;
