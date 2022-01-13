import React, { useState } from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import './dateselector.scss';
const DateSelector = ({
  value,
  label = '',
  disabled,
  readOnly,
  inputVariant = 'outlined',
  format = 'MM/DD/YYYY',
  className = '',
  minDate,
  maxDate,
  onChange,
  error,
  errorMessage
}) => {
  const [fieldValue, setFieldValue] = useState({
    value: value || null
  });
  const [focus, setFocus] = useState(false);
  const handleonSelect = (date) => {
    if (date && date._isValid) {
      const text = moment(date).format(format);
      onChange &&
        onChange({
          value: date.toISOString(),
          text
        });
      setFieldValue({
        value: date.toISOString()
      });
    } else {
      onChange &&
        onChange({
          value: date && date._i,
          text: date && date._i
        });
      setFieldValue({
        value: null
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          error={error}
          label={label}
          format={format}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          readOnly={readOnly}
          value={fieldValue.value || value || null}
          inputVariant={inputVariant}
          onChange={handleonSelect}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </MuiPickersUtilsProvider>
      {!focus && errorMessage && <div className="sq-error">{errorMessage}</div>}
    </div>
  );
};

DateSelector.propTypes = {};
export default DateSelector;
