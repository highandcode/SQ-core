import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import StandardInput from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import './select-field.scss';
import { translate } from '../../../utils/translate';
import { getValue, idFromLabel } from '../../../utils/properties';
import Icon from '../../Icon';

const InputCollection = {
  standard: StandardInput,
  outlined: OutlinedInput,
};

const SelectField = ({
  row,
  name,
  options = [],
  className = '',
  value = null,
  label = '',
  defaultText = '',
  defaultValue = '',
  onChange,
  onAnalytics,
  inputVariant = 'outlined',
  analytics,
  textField = 'text',
  valueField = 'value',
  iconField = 'iconName',
  iconColor = 'iconColor',
  checkbox = false,
  onAction,
  errorMessage,
  multiple,
  ...rest
}) => {
  const handleChange = (input) => {
    onChange &&
      onChange({
        value: input.target.value,
        options,
      });
  };
  const finalOptions = getValue(this, options, row) || [];
  const isValid = _.filter(finalOptions, { [valueField]: value }).length > 0 || value === '';
  const InputToRender =
    InputCollection[inputVariant] || InputCollection.outlined;
  const testId = idFromLabel(label);
  return (
    <div className={`sq-select-field ${className}`}>
      <FormControl
        variant={inputVariant}
        fullWidth={true}
        className="sq-select-field-form-wrap"
      >
        {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
        <Select
          id={name}
          MenuProps={{
            classes: {
              root: 'sq-select-field__pop-over'
            }
          }}
          defaultValue={defaultValue}
          className="sq-select-field__input"
          data-testid={testId}
          value={multiple ? value ? value : [] : isValid ? value : undefined}
          onChange={handleChange}
          input={<InputToRender label={label} />}
          multiple={multiple}
          {...rest}
        >
          {!!defaultText && (
            <MenuItem value={defaultValue}>{translate(defaultText)}</MenuItem>
          )}

          {Array.isArray(finalOptions) &&
            finalOptions.map((option, key) => {
              return (
                <MenuItem key={key} value={option[valueField]}>
                  {multiple && checkbox && <Checkbox checked={value?.indexOf(option[valueField]) > -1} />}
                  {option[iconField] && (
                    <Icon
                      name={option[iconField]}
                      size="small"
                      variant={rest.disabled ? 'default' : option[iconColor]}
                    />
                  )}
                  {option[textField]}
                </MenuItem>
              );
            })}
        </Select>
        {errorMessage && (
          <div className="sq-error sq-select-field--error">{errorMessage}</div>
        )}
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
  onChange: PropTypes.func,
};

export default SelectField;
