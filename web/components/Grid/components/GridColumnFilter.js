import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckboxField } from '../../ui/Checkbox';
import Icon from '../../Icon';

const GridColumnFilter = ({ columns = [], value = [], onChange }) => {
  const hasAllSelection = columns.map((i) => value.customize !== false && value.indexOf(i.name) > -1).filter((a) => a === false).length === 0;
  const handleSelectAll = (data) => {
    if (data.checked) {
      onChange &&
        onChange({
          value: columns.map((i) => i.name),
        });
    } else {
      onChange &&
        onChange({
          value: [],
        });
    }
  };
  const handleChange = (data, col) => {
    if (data.checked) {
      onChange &&
        onChange({
          value: [...value, col.name],
        });
    } else {
      const copyVal = [...value];
      const idx = copyVal.indexOf(col.name);
      if (idx > -1) {
        copyVal.splice(idx, 1);
        onChange &&
          onChange({
            value: copyVal,
          });
      }
    }
  };
  return (
    <div className={`sq-grid__col-filters`} role="column-filter">
      <div className="sq-grid__col-filters__header">
        <CheckboxField checked={hasAllSelection} onChange={handleSelectAll} text={'Select All'} />
      </div>
      <div className="sq-grid__col-filters__body">
        {columns.map((col) => {
          return col.customize !== false ? (
            <div className="sq-grid__col-filters__item" key={`col-${col.name}`}>
             <Icon name="DragHandle" /> <CheckboxField className='sq-grid__col-filters__checkbox' onChange={(value) => handleChange(value, col)} checked={value.indexOf(col.name) > -1} text={col.headerText} />
            </div>
          ) : (
            <></>
          );
        })}
      </div>
    </div>
  );
};

GridColumnFilter.propTypes = {
  errors: PropTypes.object,
  column: PropTypes.object,
  value: PropTypes.any,
  row: PropTypes.object,
  formatter: PropTypes.object,
  onAction: PropTypes.func,
  onChange: PropTypes.func,
  onAnalytics: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  beforeRender: PropTypes.func,
};

export default GridColumnFilter;
