import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Icon from '../../Icon';

const ButtonSelection = ({ className = '', label, options = [], defaultValue, textField = 'text', valueField = 'value', value, onChange, variant = 'outlined' }) => {
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
          value: defaultValue || undefined,
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
            const isSelected = item.value === value;
            if (isSelected) {
              selectedProsp.variant = 'contained';
            }
            const { title, ...restItem } = item;
            return title ? (
              <Tooltip title={title}>
                <Button key={idx} {...selectedProsp} {...restItem} aria-label={item[textField]} onClick={(e) => handleClick(e, item)}>
                  {item.iconName && <Icon variant={isSelected ? 'white' : 'primary'} name={item.iconName} size="xs" />}
                  {item[textField]}
                </Button>
              </Tooltip>
            ) : (
              <Button key={idx} {...selectedProsp} {...restItem} aria-label={item[textField]} onClick={(e) => handleClick(e, item)}>
                {item.iconName && <Icon variant={isSelected ? 'white' : 'primary'} name={item.iconName} size="xs" />}
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
