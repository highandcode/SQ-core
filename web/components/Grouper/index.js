import React from 'react';
import PropTypes from 'prop-types';
import { getValue } from '../../utils/properties';
import { getMap } from '../ui';


const Grouper = ({ className = '', fields = [], row }) => {
  const comps = getMap();
  return (
    <div className={`sq-grouper ${className}`}>
      {fields.map(({ cmpType, defaultValue = '', ...field }, index) => {
        const CompToRender = comps[cmpType] || comps.Text;
        const textValue = getValue(this, defaultValue, row);
        const newValue = row[field.name] !== undefined ? row[field.name] : textValue;
        const classValue = getValue(this, field.className, row);
        return (
          <CompToRender key={index} className={`${classValue}`} {...field} row={row} value={newValue} parentTag={field.parentTag}></CompToRender>
        );
      })}
    </div>
  );
};
Grouper.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  fields: PropTypes.array,
  row: PropTypes.object,
  tag: PropTypes.string
};

export default Grouper;
