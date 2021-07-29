import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardButton from '../CardButton';
import './card-button-list.scss';

const CardButtonList = ({ className = '', options = [], value, valueField = 'value', onChange, errorMessage }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (data) => {
    setCurrentValue(data.value);
    onChange &&
      onChange({
        value: data.value || ''
      });
  };

  return (
    <div className={`sq-card-button-list ${className}`}>
      <div className="sq-card-button-list__container">
        {options.map((option, idx) => {
          return (
            <CardButton
              key={idx}
              {...option}
              value={currentValue}
              selectedValue={option[valueField]}
              onChange={(data) => handleChange(data)}
            ></CardButton>
          );
        })}
      </div>
      {errorMessage && <div className="sq-error">{errorMessage}</div>}
    </div>
  );
};

CardButtonList.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.boolean, PropTypes.string]),
  valueField: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  options: PropTypes.array
};

export default CardButtonList;
