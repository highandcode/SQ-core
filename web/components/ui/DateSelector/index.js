import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';

import './dateselector.scss';

const DateSelector = ({
  value,
  label = '',
  disabled,
  readOnly,
  helperText,
  inputVariant = 'outlined',
  format = 'MM/dd/yyyy',
  mask = '__/__/____',
  className = '',
  minDate,
  maxDate,
  onChange,
  error,
  errorMessage,
}) => {
 
  const [focus, setFocus] = useState(false);
  const handleonSelect = (date, input) => {
    if (date && moment(date, format, true).isValid()) {
      const text = moment(date).format(format);
      onChange &&
        onChange({
          value: date.toISOString(),
          text,
        });
     
    } else {
      onChange &&
        onChange({
          value: input,
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
  return (
    <div className={`sq-date-selector ${className}`}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          inputFormat={format}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          mask={mask}
          value={value || null}
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
