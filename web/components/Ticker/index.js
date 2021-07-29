import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { formatters } from '../../utils/format';
import './ticker.scss';

function Ticker({
  value,
  className = '',
  formatter = {},
  theme = '',
  row
}) {
  const { type, ...restFormatter } = formatter;
  const iconName = value < 0 ? 'arrowdropdown' : value > 0 ? 'arrowdropup' : '';
  const classColor = value < 0 ? `sq-text-success ${theme}` : value > 0 ? `sq-text-error ${theme}` : `sq-text-muted ${theme}`;
  const finalValue = (type && formatters[type] && formatters[type](value, { ...restFormatter }, row)) || value;
  return (
    <div className={`sq-small-ticker ${className} ${classColor}`}>
      <div className="sq-small-ticker__container">
        {iconName && <Icon variant="normal" name={iconName} />}
        {finalValue}
      </div>
    </div>
  );
}

Ticker.propTypes = {
  value: PropTypes.any,
  className: PropTypes.string,
  formatter: PropTypes.object,
  row: PropTypes.object
};

export default Ticker;
