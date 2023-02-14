import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Icon from '../../Icon';
import { TextField } from '@mui/material';
import { getValue } from '../../../utils/properties';

const SQAutocomplete = ({ row, name, options = [], freeSolo, fixedOptions = [], allowFreeText = false, className = '', disabled, inputClassName = '', value = null, label = '', onChange, onAnalytics, inputVariant = 'outlined', analytics, defaultValue = '', textField = 'text', valueField = 'value', multiple, onAction, error, errorMessage, compProps = {}, ...rest }) => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e, value) => {
    onChange &&
      onChange({
        value: multiple ? [...fixedOptions.map((i) => i[valueField]), ...value.filter((option) => fixedOptions.indexOf(option) === -1).map((i) => i[valueField])] : value && value[valueField],
        options,
      });
  };


  const handleBlur = () => {
    console.log('@@@blur', allowFreeText, inputValue, value);
    if (allowFreeText && inputValue) {
      onChange &&
        onChange({
          value: inputValue,
          options,
        });
    }
  };

  const output = getValue(this, options, row) || [];
  let finalOptions = [...output];
  const finalFixedOptions = getValue(this, fixedOptions, row) || [];
  let optionFound;
  if (!multiple) {
    optionFound = Array.isArray(finalOptions) && finalOptions.filter((i) => i[valueField] === value)[0];
  } else {
    optionFound = value
      ?.map((item) => {
        const found = Array.isArray(finalOptions) && finalOptions.filter((i) => i[valueField] === item)[0];
        return found;
      })
      .filter((i) => !!i);
  }
  if (!optionFound && allowFreeText && value) {
    finalOptions.push({ [textField]: value,[valueField]: value });
    if (!optionFound && inputValue === value) {
      optionFound = finalOptions[finalOptions.length - 1];
    }
  }

  return (
    <div className={`sq-autocomplete ${className}`}>
      <Autocomplete
        disabled={disabled}
        {...compProps}
        classes={{
          popper: 'sq-autocomplete__pop-over',
        }}
        inputValue={inputValue}
        onBlur={handleBlur}
        freeSolo={freeSolo || multiple}
        autoSelect={multiple}
        multiple={multiple}
        options={finalOptions}
        getOptionLabel={(option) => (rest.getOptionLabel ? rest.getOptionLabel(option) : option[textField] || '')}
        onChange={handleChange}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={
                <div className="sq-autocomplete__chip flb-d flb-a-center ">
                  {option.iconName && <Icon size={'xs'} name={option.iconName} variant={option.iconColor} />}
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
            {option.iconName && <Icon name={option.iconName} variant={option.iconColor} />}
            {rest.getOptionLabel ? rest.getOptionLabel(option) : option[textField]}
          </Box>
        )}
        value={optionFound || value || (multiple ? [] : null)}
        onInputChange={(event, newInputValue, reason, test) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => {
          return <TextField {...params} error={error} className={inputClassName} label={label} />;
        }}
      />
      {errorMessage && <div className="sq-error sq-autocomplete--error">{errorMessage}</div>}
    </div>
  );
};

SQAutocomplete.propTypes = {
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  row: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  textField: PropTypes.string,
  valueField: PropTypes.string,
  onChange: PropTypes.func,
};

export default SQAutocomplete;
