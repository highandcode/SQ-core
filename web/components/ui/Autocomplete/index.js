import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Icon from '../../Icon';
import InputField from '../InputField';
import './auto-complete.scss';
import { getValue } from '../../../utils/properties';

const SQAutocomplete = ({
  row,
  name,
  options = [],
  fixedOptions = [],
  className = '',
  inputClassName = '',
  value = null,
  label = '',
  onChange,
  onAnalytics,
  inputVariant = 'outlined',
  analytics,
  defaultValue = '',
  textField = 'text',
  valueField = 'value',
  multiple,
  onAction,
  error,
  errorMessage,
  compProps = {},
  ...rest
}) => {
  const handleChange = (e, value) => {
    onChange &&
      onChange({
        value: multiple
          ? [
              ...fixedOptions.map((i) => i[valueField]),
              ...value
                .filter((option) => fixedOptions.indexOf(option) === -1)
                .map((i) => i[valueField]),
            ]
          : value && value[valueField],
        options,
      });
  };

  const finalOptions = getValue(this, options, row) || [];
  const finalFixedOptions = getValue(this, fixedOptions, row) || [];
  let optionFound;
  if (!multiple) {
    optionFound =
      finalOptions && finalOptions.filter((i) => i[valueField] === value)[0];
  } else {
    optionFound = value?.map((item) => {
      const found = finalOptions && finalOptions.filter((i) => i[valueField] === item)[0];
      return found;
    }).filter((i) => !!i);
  }

  const [inputValue, setInputValue] = useState('');
  return (
    <div className={`sq-autocomplete ${className}`}>
      <Autocomplete
        {...compProps}
        multiple={multiple}
        options={finalOptions}
        inputValue={inputValue}
        getOptionLabel={(option) => rest.getOptionLabel ? rest.getOptionLabel(option) : (option[textField])   || ''}
        onChange={handleChange}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={
                <div className="sq-autocomplete__chip flb-d flb-a-center ">
                  {option.iconName && (
                    <Icon size={'xs'} name={option.iconName} variant={option.iconColor} />
                  )}
                  {option[textField]}
                </div>
              }
              {...getTagProps({ index })}
              disabled={finalFixedOptions.indexOf(option) !== -1}
            />
          ))
        }
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option.iconName && (
              <Icon name={option.iconName} variant={option.iconColor} />
            )}
            {rest.getOptionLabel ? rest.getOptionLabel(option) : (option[textField]) }
          </Box>
        )}
        value={optionFound || value || (multiple ? [] : null)}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => {
          return (
            <InputField
              {...params}
              error={error}
              className={inputClassName}
              label={label}
            />
          );
        }}
      />
      {errorMessage && (
        <div className="sq-error sq-autocomplete--error">{errorMessage}</div>
      )}
    </div>
  );
};

SQAutocomplete.propTypes = {
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  row: PropTypes.object,
  className: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  textField: PropTypes.string,
  valueField: PropTypes.string,
  onChange: PropTypes.func,
};

export default SQAutocomplete;
