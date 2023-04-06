import React from 'react';
import PropTypes from 'prop-types';
import FieldText from '../FieldText';
import Text from '../Text';
import Icon from '../../Icon';
import TagLabel from '../TagLabel';
import HTML from '../HTML';
import Link from '../Link';
import { processor } from '../../../utils';

const fields = {
  FieldText,
  Text,
  TagLabel,
  HTML,
  Link,
};
const DataField = ({
  label,
  labelIcon,
  className = '',
  value = '',
  size = 'default',
  iconSize,
  labelIconSize = 'small',
  defaultText = '--',
  fieldType = '',
  optionsName,
  options,
  ...rest
}) => {
  const RenderText = fields[fieldType] || fields.Text;
  let otherProps = {};
  if (optionsName || options) {
    otherProps = processor.execute('globals.getOption', value, { optionsName, options, ...rest });
  }
  return (
    <div className={`sq-data-field ${className} sq-data-field--${size}`}>
      <label className="sq-data-field__label">{labelIcon && <Icon name={labelIcon} size={labelIconSize} variant={'normal'} />}{label}</label>
      <div className="sq-data-field__container">
        <div className="sq-data-field__value">
          <RenderText value={otherProps.text || value || defaultText} {...otherProps} size={iconSize} {...rest} />
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
