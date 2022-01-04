import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputField from '../InputField';
import './auto-complete.scss';
import { getValue } from '../../../utils/properties';

const SQAutocomplete = ({
  row,
  name,
  options = [],
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
        value: value,
        options
      });
  };
  const finalOptions = getValue(this, options, row) || [];
  const [inputValue, setInputValue] = useState('');
  return (
    <div className={`sq-autocomplete ${className}`}>
      <Autocomplete
        {...rest}
        multiple={multiple}
        options={finalOptions}
        inputValue={inputValue}
        getOptionLabel={(option) => option[textField]}
        onChange={handleChange}
        value={value}
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
