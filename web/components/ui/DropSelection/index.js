import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Icon from '../../Icon';
import './drop-selection.scss';
import { translate } from '../../../utils/translate';
import { getValue } from '../../../utils/properties';

const SelectField = ({
  row,
  name,
  options = [],
  className = '',
  value = '',
  label = '',
  defaultText = '',
  defaultValue = '',
  onChange,
  textField = 'text',
  valueField = 'value',
  errorMessage,
  ...rest
}) => {
  const handleChange = (option) => {
    onChange &&
      onChange({
        value: option[valueField],
        text: option[textField],
        options
      });
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const toggleClick = () => {
    setOpen(!open);
  };
  const finalOptions = getValue(this, options, row);
  const selectedItem = _.filter(finalOptions, { [valueField]: value });
  const isValid = selectedItem.length > 0 || value === defaultValue;
  const displayText = selectedItem.length > 0 ? `${selectedItem[0][textField]}` : value === defaultValue ? defaultText : '';
  const expandIcon = open ? 'collapse' : 'expand';
  return (
    <div className={`sq-drop-select ${open ? 'sq-drop-select--open' : ''} ${className}`}>
      <div className={`sq-drop-select__input`} onClick={toggleClick}>
        <span className="sq-drop-select__input-text">{isValid && displayText}</span>
        <span className="sq-drop-select__trigger">
          <Icon name={`${expandIcon}`} size="large" />
        </span>
      </div>
      <div className="sq-drop-select__list-wrapper">
        <ul className={'sq-drop-select__list'}>
          {defaultText && (
            <li value={defaultValue} onClick={() => handleChange({ [valueField]: defaultValue, [textField]: defaultText })}>
              {translate(defaultText)}
            </li>
          )}
          {finalOptions.map((option, key) => {
            return (
              <li key={key} value={option[valueField]} onClick={() => handleChange(option)}>
                {translate(option[textField])}
              </li>
            );
          })}
        </ul>
      </div>
      {errorMessage && <div className="sq-error sq-select-field--error">{errorMessage}</div>}
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string,
  defaultText: PropTypes.string,
  errorMessage: PropTypes.string,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  row: PropTypes.object,
  className: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  value: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectField;
