import React from 'react';
import PropTypes from 'prop-types';
import FieldText from '../FieldText';
import Text from '../Text';
import TagLabel from '../TagLabel';
import HTML from '../HTML';
import { processor } from '../../../utils';
import './_data-field.scss';

const fields = {
  FieldText,
  Text,
  TagLabel,
  HTML,
};
const DataField = ({
  label,
  className = '',
  value = '',
  size = 'default',
  defaultText = '--',
  fieldType = '',
  optionsName,
}) => {
  const RenderText = fields[fieldType] || fields.Text;
  let otherProps = {};
  if (optionsName) {
    otherProps = processor.execute('globals.getOption', value, { optionsName });
  }
  return (
    <div className={`sq-data-field ${className} sq-data-field--${size}`}>
      <label className="sq-data-field__label">{label}</label>
      <div className="sq-data-field__container">
        <div className="sq-data-field__value">
          <RenderText value={otherProps.text || value || defaultText} {...otherProps} />
        </div>
      </div>
    </div>
  );
};

DataField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onAnalytics: PropTypes.func,
  analytics: PropTypes.object,
};

export default DataField;
