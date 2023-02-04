import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import common from '../../../utils/common';

const CheckboxField = ({
  name,
  className = '',
  defaultValue = '',
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
  const stateChecked  = checked || selectedValue === value;
  const {
    click: anlayticClick,
    checked: anlayticChecked,
    unchecked: analyticUnChcked,
  } = analytics;
  const handleChange = (input) => {
    !disabled && anlayticClick && onAnalytics && onAnalytics(anlayticClick);
    if (input.target.checked) {
      !disabled &&
        onChange &&
        onChange(
          {
            checked: true,
            value: selectedValue,
          },
          input
        );
      !disabled &&
        anlayticChecked &&
        onAnalytics &&
        onAnalytics(anlayticChecked);
    } else {
      !disabled &&
        onChange &&
        onChange(
          {
            checked: false,
            value: common.isNullOrUndefined(defaultValue) ? '' : defaultValue,
          },
          input
        );
      !disabled &&
        analyticUnChcked &&
        onAnalytics &&
        onAnalytics(analyticUnChcked);
    }
  };
  return (
    <div className={`sq-checkbox-field ${className}`}>
      <FormControl component="fieldset" error={rest.error}>
        {label && <FormLabel component="legend">{label}</FormLabel>}
        <FormControlLabel
          control={
            <Checkbox
              disabled={disabled}
              checked={stateChecked}
              onChange={handleChange}
              name={name}
            />
          }
          label={text}
        />
      </FormControl>
      {errorMessage && <div className="sq-error sq-checkbox-list--error">{errorMessage}</div>}
    </div>
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
  onChange: PropTypes.func,
};

const CheckboxList = ({
  name,
  options = [],
  className = '',
  disabled = false,
  info = '',
  value = [],
  label = '',
  labelField = 'label',
  textField = 'text',
  valueField = 'value',
  onChange,
  errorMessage,
}) => {

  const handleChange = (input, item) => {
    let finalValue;
    if (input.checked) {
      finalValue = [...value, item[valueField]];
    } else {
      const cloneVals = value.slice();
      cloneVals.splice(cloneVals.indexOf(item[valueField]), 1);
      finalValue = [...cloneVals];
    }
    onChange &&
      onChange({
        value: finalValue,
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
                disabled={disabled}
                checked={value.indexOf(option[valueField]) > -1}
                text={option[textField]}
                label={option[labelField]}
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
  errorMessage: PropTypes.string,
};

export default CheckboxList;
export { CheckboxField, CheckboxList };
