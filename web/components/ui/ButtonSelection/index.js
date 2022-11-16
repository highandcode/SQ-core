import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import './_button-selection.scss';

const ButtonSelection = ({ className = '', label, options = [], textField = 'text', valueField = 'value', value, onChange, variant = 'outlined' }) => {
  const handleClick = (e, option) => {
    if (option[valueField] !== value) {
      onChange &&
        onChange({
          value: option[valueField],
          text: option[textField],
        });
    } else {
      onChange &&
      onChange({
        value: undefined,
      });
    }
  };

  return (
    <div className={`sq-button-selection ${className}`}>
      <div className="sq-button-selection__container">
        {label && <div className="sq-button-selection__label">{label}</div>}
        <ButtonGroup variant={variant} aria-label={label}>
          {options.map((item, idx) => {
            const selectedProsp = {};
            if (item.value === value) {
              selectedProsp.variant = 'contained';
            }
            return (
              <Button key={idx} {...selectedProsp} {...item} aria-label={item[textField]} onClick={(e) => handleClick(e, item)}>
                {item[textField]}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    </div>
  );
};

ButtonSelection.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onAnalytics: PropTypes.func,
  analytics: PropTypes.object,
};

export default ButtonSelection;
