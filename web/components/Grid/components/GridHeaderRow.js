import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';

const GridHeaderRow = ({ columns = [], sortColumn, sortOrder = 'asc', onSort, enableSort }) => {
  const isSortEnabled = enableSort && sortColumn && sortOrder;
  const sortOrderIconName = sortOrder?.toLowerCase() == "asc" ? 'arrowdropup' :  sortOrder?.toLowerCase() == "desc" ? 'arrowdropdown' : '';
  const handleClick = (e, column) => {
    console.log(sortColumn, sortOrder, column.name);
    if (enableSort) {
      onSort && onSort({
        sortColumn: column.name,
        sortOrder: column.name === sortColumn ? sortOrder?.toLowerCase() === 'asc' ? 'desc' : 'asc' : 'asc'
      }, column);
    }
  }
  return (<div className={`sq-grid__row sq-grid__header-row ${enableSort ? 'sq-grid-header--sortable' : ''}`} role="header-row">
    {columns.map((column, index) => {
      const hasSortColumn = column.name === sortColumn;
      const isColSortEnabled = column.sort !== false;
      const hasEnabledSort = isColSortEnabled && isSortEnabled && hasSortColumn;
      return <div key={'gh-' + index} className={`sq-grid__cell sq-grid__header-row-cell ${isColSortEnabled ? 'sort-enable' : ''} ${column.className}`} onClick={(e)=> isColSortEnabled && handleClick(e, column)}>
        {column.headerText} {hasEnabledSort && <Icon className='sq-grid__cell-sort' name={sortOrderIconName} />}
      </div>;
    })}
  </div>);
};

GridHeaderRow.propTypes = {
  columns: PropTypes.array
};

export default GridHeaderRow;