import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../InputField';
import CheckboxList from '../Checkbox';

const InputWithOptions = ({
  optionsLabel,
  label,
  value,
  className = '',
  options = [],
  onChange,
}) => {
  const handleCheckChange = (data) => {
    let existing = value || '';
    options.forEach((item) => {
      if (existing.indexOf(item.value) > -1) {
        existing = existing.replace(item.value, '');
      }
    });
    data.value.forEach((item) => {
      if (existing.indexOf(item) === -1) {
        existing = existing + ' ' + item;
      }
    });
    onChange &&
      onChange({
        value: existing
          .split(' ')
          .filter((i) => !!i)
          .join(' '),
      });
  };
  const handleInputChange = (data) => {
    onChange && onChange(data);
  };
  return (
    <div className={`sq-input-with-options ${className}`}>
      <CheckboxList
        label={optionsLabel}
        options={options}
        value={value?.split(' ')}
        onChange={handleCheckChange}
      />
      <Input label={label} value={value} onChange={handleInputChange} />
    </div>
  );
};
InputWithOptions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default InputWithOptions;
