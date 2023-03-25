import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import Icon from '../../Icon';

const GridHeaderRow = ({ allowResizeCols = true, columns = [], spacer = false, onColResize, sortColumn, sortOrder = 'asc', sortSeparator = '|', onSort, enableSort, spacerWidth = 0 }) => {
  const isSortEnabled = enableSort && sortColumn && sortOrder;
  const [width, setWidth] = useState({});
  const [startX, setStartX] = useState();
  const dragHandler = useCallback(
    (e, col) => {
      let w = startX && e.clientX ? Math.round(startX.w + (e.clientX - startX.x)) : 0;
      if (w > 0 && (!width[col.name] || (width[col.name] && width[col.name] && w !== width[col.name].width))) {
        console.log(w);
        const newWi = {
          ...width,
          [col.name]: {
            width: w,
            flexBasis: w,
            flexGrow: 0,
            flexShrink: 0,
          },
        };
        setWidth(newWi);
        onColResize && onColResize(newWi, col);
      }
    },
    [width, startX]
  );

  const onDragStart = (e) => {
      setStartX({
      x: e.clientX,
      w: e.currentTarget.parentElement.getBoundingClientRect().width,
    });
  };
  const onDragEnd = (e) => {
      setStartX(null);
  };

  const handleClick = (e, column) => {
    const finalColName = column.sortColumnName || column.name;
    if (enableSort) {
      const eSortOrder = finalColName === sortColumn ? (sortOrder?.toLowerCase() === 'asc' ? 'desc' : 'asc') : 'asc';
      onSort &&
        onSort(
          {
            sortText: `${finalColName}${sortSeparator}${eSortOrder}`,
            sortColumn: finalColName,
            sortOrder: eSortOrder,
          },
          column
        );
    }
  };

  return (
    <>
      <div className={`sq-grid__row sq-grid__header-row ${enableSort ? 'sq-grid-header--sortable' : ''}`} role="header-row">
        {columns.map((column, index) => {
          const finalColName = column.sortColumnName || column.name;
          const hasSortColumn = finalColName === sortColumn;
          const sortOrderIconName = hasSortColumn && sortOrder?.toLowerCase() === 'asc' ? 'sort-asc' : hasSortColumn && sortOrder?.toLowerCase() === 'desc' ? 'sort-desc' : 'sort-n';
          const isColSortEnabled = isSortEnabled && column.sort !== false;
          const hasSortApplied = isColSortEnabled && isSortEnabled && hasSortColumn;
          let styleProps = {};
          if (width[column.name]) {
            styleProps = width[column.name];
          }
          return (
            <div key={'gh-' + index} className={`sq-grid__cell sq-grid__header-row-cell ${hasSortApplied ? 'sort-active' : ''} ${isColSortEnabled ? 'sort-enable' : ''} ${column.className}`} style={styleProps}>
              <div className="sq-grid__header-row-cell-wrapper" onClick={(e) => isColSortEnabled && handleClick(e, column)}>
                <div className="sq-grid__cell sq-grid__header-row-cell-text">
                  {column.headerText && (
                    <Tooltip title={column.headerText}>
                      <span>{column.headerText}</span>
                    </Tooltip>
                  )}
                </div>
                {isColSortEnabled && <Icon variant={`${hasSortColumn ? 'black' : 'muted-light'}`} className="sq-grid__cell-sort" name={sortOrderIconName} />}
              </div>
              {allowResizeCols && <div className="sq-grid__header-row-cell-resizer" onMouseUp={onDragEnd} onMouseDown={onDragStart} draggable onDrag={(e) => dragHandler(e, column)}></div>}
            </div>
          );
        })}
        {spacer && <div className={`sq-grid__cell sq-grid__header-row-cell  sq-grid__header-row-cell--spacer`}></div>}
        {spacerWidth ? <div className="sq-grid__cell sq-grid__header-row-cell sq-grid__header-row__spacer" style={{ flexBasis: `${spacerWidth}px`, flexGrow: 0, flexShrink: 0 }}></div> : undefined}
      </div>
    </>
  );
};

GridHeaderRow.propTypes = {
  columns: PropTypes.array,
};

export default GridHeaderRow;
