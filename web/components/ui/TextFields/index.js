import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import { formatters } from '../../../utils/format';
import { getValue, common } from '../../../utils/properties';
import './_text-fields.scss';

const TextFields = ({ className = '', fields = [], row }) => {
  return (
    <div className={`sq-text-fields ${className}`}>
      {fields.map(({ defaultValue = '', formatter = {}, beforeRender, ...field }, index) => {
        const { type, ...restFormatter } = formatter;
        const textValue = getValue(this, defaultValue, row);
        const isRender = beforeRender ? beforeRender(field, row) : true;
        const newValue =
          (type && formatters[type] && formatters[type](row[field.name], { defaultValue: textValue, field, row, ...restFormatter }, row)) ||
          row[field.name] ||
          textValue;
        const classValue = getValue(this, field.className, row);
        return !common.isNullOrUndefined(newValue) && isRender !== false ? (
          <Text key={index} className={`${classValue}`} tag={field.tag} value={newValue} parentTag={field.parentTag}></Text>
        ) : undefined;
      })}
    </div>
  );
};
TextFields.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  fields: PropTypes.array,
  row: PropTypes.object,
  tag: PropTypes.string
};

export default TextFields;
