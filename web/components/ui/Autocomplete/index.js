import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import InputField from '../InputField';
import './auto-complete.scss';
import { getValue } from '../../../utils/properties';

const SQAutocomplete = ({
  row,
  name,
  options = [],
  fixedOptions = [],
  className = '',
  value = '',
  label = '',
  onChange,
  onAnalytics,
  inputVariant = 'outlined',
  analytics,
  textField = 'text',
  valueField = 'value',
  multiple,
  onAction,
  errorMessage,
  ...rest
}) => {
  const handleChange = (e, value) => {
    onChange &&
      onChange({
        value: multiple
          ? [...fixedOptions.map((i) => i[valueField]), ...value.filter((option) => fixedOptions.indexOf(option) === -1).map((i) => i[valueField])]
          : value && value[valueField],
        options
      });
  };
  const finalOptions = getValue(this, options, row) || [];
  const finalFixedOptions = getValue(this, fixedOptions, row) || [];
  let optionFound;
  if (!multiple) {
    optionFound = finalOptions && finalOptions.filter((i) => i[valueField] === value)[0];
  } else {
    optionFound = finalOptions && finalOptions.filter((i) => value.indexOf(i[valueField]) > -1);
  }
  
  const [inputValue, setInputValue] = useState('');
  return (
    <div className={`sq-autocomplete ${className}`}>
      <Autocomplete
        {...rest}
        multiple={multiple}
        options={finalOptions}
        inputValue={inputValue}
        getOptionLabel={(option) => option[textField] || ''}
        onChange={handleChange}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option[textField]} {...getTagProps({ index })} disabled={finalFixedOptions.indexOf(option) !== -1} />
          ))
        }
        value={optionFound || value || (multiple ? [] : '')}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => {
          return <InputField {...params} className="mb-wide" label={label} />;
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
  className: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  textField: PropTypes.string,
  valueField: PropTypes.string,
  onChange: PropTypes.func
};

export default SQAutocomplete;
