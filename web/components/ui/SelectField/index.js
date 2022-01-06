import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import StandardInput from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './select-field.scss';
import { translate } from '../../../utils/translate';
import { getValue } from '../../../utils/properties';
const InputCollection = {
  standard: StandardInput,
  outlined: OutlinedInput
}

const SelectField = ({
  row,
  name,
  options = [],
  className = '',
  value = '',
  label = '',
  defaultText = '',
  defaultValue = '',
  onChange,
  onAnalytics,
  inputVariant = 'outlined',
  analytics,
  textField = 'text',
  valueField = 'value',
  onAction,
  errorMessage,
  ...rest
}) => {
  const handleChange = (input) => {
    onChange &&
      onChange({
        value: input.target.value,
        options
      });
  };
  const finalOptions = getValue(this, options, row);
  const isValid = _.filter(finalOptions, { [valueField]: value }).length > 0;
  const InputToRender = InputCollection[inputVariant] || InputCollection.outlined;
  return (
    <div className={`sq-select-field ${className}`}>
      <FormControl variant={inputVariant} fullWidth={true} className="sq-select-field-form-wrap">
        {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
        <Select id={name} className="sq-select-field__input" value={isValid ? value : ''} onChange={handleChange} input={<InputToRender label={label} />} {...rest}>
          {defaultText && <MenuItem value={defaultValue}>{translate(defaultText)}</MenuItem>}
          {finalOptions && finalOptions.map((option, key) => {
            return (
              <MenuItem key={key} value={option[valueField]}>
                {translate(option[textField])}
              </MenuItem>
            );
          })}
        </Select>
        {errorMessage && <div className="sq-error sq-select-field--error">{errorMessage}</div>}
      </FormControl>
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string,
  defaultText: PropTypes.string,
  errorMessage: PropTypes.string,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  row: PropTypes.object,
  className: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  value: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectField;
