import React from 'react';
import PropTypes from 'prop-types';

const GridHeaderRow = ({ columns = [] }) => {
  return (<div className="sq-grid-cmp__row sq-grid-cmp__header-row">
    {columns.map((column, index) => {
      return <div key={'gh-' + index} className={`sq-grid-cmp__cell sq-grid-cmp__header-row-cell ${column.className}`}>
        {column.headerText}
      </div>;
    })}
  </div>);
};

GridHeaderRow.propTypes = {
  columns: PropTypes.array
};

export default GridHeaderRow;