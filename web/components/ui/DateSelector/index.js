import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import { getValue } from '../../../utils/properties';
import './dateselector.scss';

const DateSelector = ({
  value,
  label = '',
  disabled,
  readOnly,
  helperText,
  inputVariant = 'outlined',
  inputFormat = 'MM/dd/yyyy',
  outputFormat = 'MM/DD/YYYY',
  mask = '__/__/____',
  className = '',
  minDate,
  maxDate,
  onChange,
  error,
  errorMessage,
  row,
  ...rest
}) => {
  const isValid = value ? moment(value).isValid() : false;
  const valueDate = isValid ? moment(value)._d : value;
  const [focus, setFocus] = useState(false);
  const handleonSelect = (date, input) => {
    if (!input && date && moment(date).isValid()) {
      const text = moment(date).format(outputFormat);
      onChange &&
        onChange({
          value: moment(date).toISOString(),
          text,
        });
     
    } else if (input) {
      const valueToPass =  moment(input, outputFormat, true).isValid() ? moment(input).toISOString() : null;
      onChange &&
        onChange({
          value: valueToPass,
          text: input,
        });
    }
  };
  const handleOnFocus = () => {
    setFocus(true);
  };
  const handleOnBlur = () => {
    setFocus(false);
  };

  const finalMinDate = getValue(this, minDate, row);
  const finalMaxDate = getValue(this, maxDate, row);

  return (
    <div className={`sq-date-selector ${className}`}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          {...rest}
          inputFormat={inputFormat}
          disabled={disabled}
          minDate={finalMinDate}
          maxDate={finalMaxDate}
          mask={mask}
          value={isValid ? (valueDate || null) : null}
          renderInput={(props) => (
            <TextField
              {...props}
              label={label}
              error={error}
              variant={inputVariant}
              readOnly={readOnly}
              helperText={helperText}
            />
          )}
          onChange={handleonSelect}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </LocalizationProvider>
      {!focus && errorMessage && <div className="sq-error">{errorMessage}</div>}
    </div>
  );
};

DateSelector.propTypes = {};
export default DateSelector;
