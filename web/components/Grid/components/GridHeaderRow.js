import React from 'react';
import PropTypes from 'prop-types';

const GridHeaderRow = ({ columns = [] }) => {
  return (<div className="sq-grid__row sq-grid__header-row" role="header-row">
    {columns.map((column, index) => {
      return <div key={'gh-' + index} className={`sq-grid__cell sq-grid__header-row-cell ${column.className}`}>
        {column.headerText}
      </div>;
    })}
  </div>);
};

GridHeaderRow.propTypes = {
  columns: PropTypes.array
};

export default GridHeaderRow;