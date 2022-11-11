import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CheckboxField } from '../../ui/Checkbox';
import Icon from '../../Icon';

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const GridColumnFilter = ({ columns = [], value = [], colOrder, onChange, onColumReorder }) => {
 
  const [internalColumns, setInternalColumns] = useState([...columns].sort((a, b) => colOrder && (colOrder[a.name] > colOrder[b.name] ? 1 : colOrder[a.name] < colOrder[b.name] ? -1 : 0)));
  const hasAllSelection = columns.map((i) => value.indexOf(i.name) > -1).filter((a) => a === false).length === 0;
  const handleSelectAll = (data) => {
    if (data.checked) {
      onChange &&
        onChange({
          value: internalColumns.map((i) => i.name),
        });
    } else {
      onChange &&
        onChange({
          value: internalColumns.filter((i) => i.customize === false).map((i) => i.name),
        });
    }
  };
  const handleChange = (data, col) => {
    if (data.checked) {
      const allCols = [...value, col.name];
      onChange &&
        onChange({
          value: internalColumns.filter((col) => col.customize === false || allCols.indexOf(col.name) > -1).map((i) => i.name),
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
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(internalColumns, result.source.index, result.destination.index);
    const colOrder = {};
    items.forEach((key, idx) => {
      colOrder[key.name] = idx;
    });
    setInternalColumns(items);
    onColumReorder && onColumReorder(colOrder);
    onChange &&
      onChange({
        value: items.filter((col) => value.indexOf(col.name) > -1).map((i) => i.name),
      });
  };
  return (
    <div className={`sq-grid__col-filters`} role="column-filter">
      <div className="sq-grid__col-filters__header">
        <CheckboxField checked={hasAllSelection} onChange={handleSelectAll} text={'Select All'} />
      </div>
      <div className="sq-grid__col-filters__body">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} className={`sq-grid__col-filters__list ${!snapshot.isDraggingOver ? 'drag-in-progress' : ''}`} ref={provided.innerRef}>
                {internalColumns.map((col, index) => (
                  <Draggable key={col.name} draggableId={col.name} index={index}>
                    {(provided, snapshot) => (
                      <div className={`sq-grid__col-filters__item ${snapshot.isDragging ? 'dragging' : ''}`} key={`col-${col.name}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Icon name="DragHandle" /> <CheckboxField className="sq-grid__col-filters__checkbox" onChange={(value) => handleChange(value, col)} disabled={col.customize === false} checked={col.customize === false || value.indexOf(col.name) > -1} text={col.headerText || 'No Name'} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* {columns.map((col) => {
          return (
            <div className="sq-grid__col-filters__item" key={`col-${col.name}`}>
              <Icon name="DragHandle" /> <CheckboxField className="sq-grid__col-filters__checkbox" onChange={(value) => handleChange(value, col)} disabled={col.customize === false} checked={col.customize === false || value.indexOf(col.name) > -1} text={col.headerText} />
            </div>
          );
        })} */}
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
