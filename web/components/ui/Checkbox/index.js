import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

const CheckboxField = ({
  name,
  className = '',
  selectedValue = 'on',
  disabled = false,
  value = '',
  checked = false,
  label = '',
  text = '',
  onChange,
  errorMessage,
  analytics = {},
  onAnalytics,
  ...rest
}) => {
  const [stateChecked, setChecked] = useState(checked || selectedValue === value);
  const { click: anlayticClick, checked: anlayticChecked, unchecked: analyticUnChcked } = analytics;
  const handleChange = (input) => {
    setChecked(input.target.checked);
    !disabled && anlayticClick && onAnalytics && onAnalytics(anlayticClick);
    if (input.target.checked) {
      !disabled &&
        onChange &&
        onChange(
          {
            checked: true,
            value: selectedValue
          },
          input
        );
      !disabled && anlayticChecked && onAnalytics && onAnalytics(anlayticChecked);
    } else {
      !disabled &&
        onChange &&
        onChange(
          {
            checked: false,
            value: ''
          },
          input
        );
      !disabled && analyticUnChcked && onAnalytics && onAnalytics(analyticUnChcked);
    }
  };
  return (
    <>
      <FormControl component="fieldset" error={rest.error}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormControlLabel className={className} control={<Checkbox checked={stateChecked} onChange={handleChange} name={name} />} label={text} />
      </FormControl>

      {<div className="sq-error sq-checkbox-list--error">{errorMessage}</div>}
    </>
  );
};

CheckboxField.propTypes = {
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  selectedValue: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const CheckboxList = ({ name, options = [], className = '', info = '', value = [], label = '', onChange, errorMessage }) => {
  const [values, setValues] = useState(value);
  const handleChange = (input, item) => {
    let finalValue;
    if (input.checked) {
      finalValue = [...values, item.value];
      setValues(finalValue);
    } else {
      values.splice(values.indexOf(item.value), 1);
      finalValue = [...values];
      setValues(values);
    }
    onChange &&
      onChange({
        value: finalValue
      });
  };
  return (
    <div className={`sq-checkbox-list ${className}`}>
      <FormControl component="fieldset">
        {label && <FormLabel component="legend">{label}</FormLabel>}
        <FormGroup>
          {options.map((option, index) => {
            return (
              <CheckboxField
                key={index}
                name={name}
                checked={values.indexOf(option.value) > -1}
                text={option.text}
                label={option.label}
                onChange={(val, e) => handleChange(val, option)}
              />
            );
          })}
        </FormGroup>
        {info && <FormHelperText>{info}</FormHelperText>}
        {<div className="sq-error sq-checkbox-list--error">{errorMessage}</div>}
      </FormControl>
    </div>
  );
};

CheckboxList.propTypes = {
  name: PropTypes.string,
  defaultText: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default CheckboxList;
export { CheckboxField, CheckboxList };
