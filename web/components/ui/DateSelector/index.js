import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import './dateselector.scss';
const DateSelector = ({
  value,
  label = '',
  disabled,
  readOnly,
  helperText,
  inputVariant = 'outlined',
  format = 'MM/dd/yyyy',
  className = '',
  minDate,
  maxDate,
  onChange,
  error,
  errorMessage,
}) => {
  const [fieldValue, setFieldValue] = useState({
    value: value || null,
  });
  const [focus, setFocus] = useState(false);
  const handleonSelect = (date) => {
    if (date && date._isValid) {
      const text = moment(date).format(format);
      onChange &&
        onChange({
          value: date.toISOString(),
          text,
        });
      setFieldValue({
        value: date.toISOString(),
      });
    } else {
      onChange &&
        onChange({
          value: date && date._i,
          text: date && date._i,
        });
      setFieldValue({
        value: null,
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
          // error={error}
          // label={label}
          inputFormat={format}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          value={fieldValue.value || value || null}
          renderInput={(props) => (
            <TextField
              {...props}
              label={label}
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
