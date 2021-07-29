import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import './_switch.scss';

const SQSwitch = ({ label, className = '', defaultValue, value, color = 'primary', onChange }) => {
  let checked = defaultValue ? defaultValue === value : value === true;
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
