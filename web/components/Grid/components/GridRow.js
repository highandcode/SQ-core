import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GridCell from './GridCell';

const Row = ({ columns = [], data = {}, onRowClick, onRowChange, onFieldBlur, onFieldClick, onFieldAction, onColumnChange, onAnalytics, className, errors = {} }) => {
  const _onChange = (column, value) => {
    onColumnChange && onColumnChange(column, value, data);
    onRowChange &&
      onRowChange(
        column,
        {
          [column.name]: value.value
        },
        data
      );
  };
  const _onRowClick = () => {
    onRowClick && onRowClick(columns, data);
  }
  const _onBlur = (column, value) => {
    onFieldBlur && onFieldBlur(column, value, data);
  };

  const _onClick = (column, value) => {
    onFieldClick && onFieldClick(column, value, data);
  };
  const _onAction = (column, value) => {
    onFieldAction && onFieldAction(column, value, data);
  };

  return (
    <div className={`sq-grid-cmp__row sq-grid-cmp__data-row ${className}`} onClick={_onRowClick}>
      {columns.map((column, index) => {
        let isRender = true;
        if (typeof column.beforeRender === 'function') {
          isRender = column.beforeRender(column, data[column.name], data);
        }

        return (
          isRender && <GridCell
            key={index}
            column={column}
            {...column}
            row={data}
            errors={errors[column.name]}
            onChange={(column, value) => {
              _onChange(column, value);
            }}
            onClick={(column, value) => {
              _onClick(column, value);
            }}
            onAction={(column, action) => {
              _onAction(column, action);
            }}
            onAnalytics={onAnalytics}
            onBlur={_onBlur}
            value={data[column.name]}
          />
        );
      })}
    </div>
  );
};

Row.propTypes = {
  columns: PropTypes.array,
  className: PropTypes.string,
  data: PropTypes.object,
  errors: PropTypes.object,
  onRowChange: PropTypes.func,
  onFieldClick: PropTypes.func,
  onFieldAction: PropTypes.func,
  onColumnChange: PropTypes.func,
  onFieldBlur: PropTypes.func
};

export default Row;
