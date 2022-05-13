import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import './_switch.scss';

const SQSwitch = ({ label, className = '', defaultValue, value, color = 'primary', onChange, onAnalytics, analytics = {} }) => {
  let checked = defaultValue ? defaultValue === value : value === true;
  const { change: changeAnalytics } = analytics;
  const handleChange = (evt) => {
    let valueToPass;
    if (evt.target.checked) {
      valueToPass = defaultValue ? defaultValue : !defaultValue ? evt.target.checked : '';
    } else {
      valueToPass = defaultValue ? '' : evt.target.checked;
    }
    onChange &&
      onChange({
        value: valueToPass
      });
    onAnalytics && changeAnalytics && onAnalytics(changeAnalytics);
  };
  return (
    <div className={`sq-swich ${className}`}>
      {label}
      <Switch checked={checked} onChange={handleChange} color={color} inputProps={{ 'aria-label': label }} />
    </div>
  );
};
SQSwitch.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.any,
  row: PropTypes.object,
  tag: PropTypes.string,
  parentTag: PropTypes.string
};

export default SQSwitch;
