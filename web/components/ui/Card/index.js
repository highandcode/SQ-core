import React from 'react';
import PropTypes from 'prop-types';
import { getFormatters } from '../../../utils/format';
import './card.scss';

function CustomCard({ className = '', header = '', value = '', formatter = {}, cardType = 'primary' }) {
  const { type, ...restFormatter } = formatter;
  const formatters = getFormatters();
  const newValue = (type && formatters[type] && formatters[type](value, restFormatter)) || value;
  return (
    <div className={`sq-plain-card ${className} sq-plain-card--${cardType}`}>
      {header && (
        <div className="sq-plain-card__header">
          <span className="sq-plain-card__icon"></span>
          <span className="sq-plain-card__header-text">{header}</span>
        </div>
      )}
      <div className="sq-plain-card__value">
        <div className="sq-plain-card__value-container">{newValue}</div>
      </div>
    </div>
  );
}

CustomCard.propTypes = {
  header: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
  formatter: PropTypes.object,
};

export default CustomCard;
