import React from 'react';
import PropTypes from 'prop-types';
import { getValue } from '../../utils/properties';
import { icons } from '../../utils/storage';
import Icon from '../Icon';


const IconSelector = ({ label, value, iconSet, className = '', variant = 'default', size = 'normal', iconClass = '', row, onChange }) => {
  const finalIconClass = getValue(this, iconClass, row);
  const list = icons.getAll(iconSet);
  const handleOnChange = (icon) => {
    onChange &&
      onChange({
        value: icon
      });
  };
  return (
    <div className={`sq-icon-selector ${className}`}>
      {label}
      <div className="sq-icon-selector__icon-container">
        <div
          title={`default icon`}
          onClick={() => handleOnChange('')}
          className={`sq-icon-selector__icon-item ${!value ? 'sq-icon-selector__icon-item--selected' : ''}`}
        >
          <Icon textIcon={'N'} iconClass={finalIconClass} variant={variant} size={size} />
        </div>
        {Object.keys(list).map((icon, idx) => {
          return (
            <div
              key={idx}
              title={`${icon}`}
              onClick={() => handleOnChange(icon)}
              className={`sq-icon-selector__icon-item ${value === icon ? 'sq-icon-selector__icon-item--selected' : ''}`}
            >
              <Icon name={icon} iconClass={finalIconClass} variant={variant} size={size} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

IconSelector.propTypes = {
  className: PropTypes.string,
  row: PropTypes.object,
  onClick: PropTypes.func,
  variant: PropTypes.any,
  iconSet: PropTypes.string,
  classes: PropTypes.object,
  size: PropTypes.string
};

export default IconSelector;
