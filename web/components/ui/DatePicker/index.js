import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyledTextField } from '../InputField';
import moment from 'moment';
import InfiniteCalendar from 'react-infinite-calendar';
import Icon from '../../Icon';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import './datepicker.scss';

const DatePicker = ({ value, label = '', format = 'MM/DD/YYYY', className = '', onChange, error, errorMessage }) => {
  const [show, setShow] = useState(false);
  let [index, setIndex] = useState(0);
  const [fieldValue, setFieldValue] = useState({
    value,
    text: value && moment(value).format(format)
  });
  const [direction, setDirection] = useState("up");
  const ref = useRef(null);
  const trigger = useRef(null);

  const toggleShow = () => {
    setShow(!show);
    setTimeout(() => {
      const value = (trigger.current.offsetTop - window.scrollY - ref.current.offsetHeight);
      if (value < 0) {
        setDirection('down');
      } else {
        setDirection('up');
      }
    });
  };
  const handleonSelect = (date) => {
    const text = moment(date).format(format);
    onChange && onChange({
      value: date.toISOString(),
      text
    });
    setFieldValue({
      text,
      value: date.toISOString()
    });
    toggleShow();
    setIndex(index++);
  };

  const handleChange = (evt) => {
    setFieldValue({
      text: evt.target.value,
      value: fieldValue.value
    });
  };

  const handleBlur = (evt) => {
    var mmtDate = moment(evt.target.value);
    if (mmtDate._isValid) {
      setFieldValue({
        text: mmtDate.format(format),
        value: mmtDate._d.toISOString()
      });
      onChange && onChange({
        value: mmtDate._d.toISOString(),
        text: mmtDate.format(format)
      });
    } else {
      onChange && onChange({
        value: '',
        text: evt.target.value
      });
    }
  };

  return <div className={`sq-datepicker ${className}`} ref={trigger}>
    <StyledTextField
      className="sq-datepicker__input"
      variant="outlined"
      width={100}
      error={error}
      label={label}
      value={fieldValue.text === undefined ? (value ? moment(value).format(format) : value) : fieldValue.text}
      onChange={handleChange}
      onBlur={handleBlur}>
    </StyledTextField>
    <Icon name={'calendar'} className={`sq-datepicker__trigger`} onClick={toggleShow} />
    {<div className={`sq-datepicker__calendar ${direction} ${show ? 'sq-datepicker__calendar--visible' : ''}`} ref={ref}>
      <InfiniteCalendar
        width={400}
        height={250}
        selected={fieldValue.value}
        onSelect={handleonSelect}
      />
    </div>}
    {errorMessage && <div className="sq-error">{errorMessage}</div>}
  </div>;
};

DatePicker.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  format: PropTypes.string
};

export default DatePicker;