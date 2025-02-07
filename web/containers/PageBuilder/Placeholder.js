import React from 'react';
import { useDrop } from 'react-dnd';
import Icon from '../../components/Icon/index.js';
import { ItemTypes } from './ItemTypes.js';

function selectBackgroundColor(isActive, canDrop) {
  if (isActive) {
    return 'sq-placeholder-drop--active';
  } else if (canDrop) {
    return 'sq-placeholder-drop--can-drop';
  } else {
    return 'sq-placeholder-drop--default';
  }
}
export const Placeholder = ({ component, name, allowedDropEffect, onDrop, accept, plaecHolderStyle = 'box', hoverText }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: accept || ItemTypes.COMPONENT,
      drop: (item, params) => {
        onDrop && onDrop(item, params);
        return {
          name: `${allowedDropEffect}placeholder`,
          allowedDropEffect,
        };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [allowedDropEffect]
  );
  const isActive = canDrop && isOver;
  const backgroundCSS = selectBackgroundColor(isActive, canDrop);
  const finalName = component && name ? `for ${component}#${name}` : 'for root'
  return (
    <div className={`sq-placeholder-drop ${backgroundCSS} sq-placeholder-drop-style-${plaecHolderStyle}`} ref={drop} style={{}}>
      <div className="sq-placeholder-drop__hover-text">
        {plaecHolderStyle === 'line' ? hoverText : ''}
      </div>
      <div className="sq-placeholder-drop__content">
        <Icon name="Move" variant={'extra1'} />
        <br />
        {isActive ? `Release to drop ${finalName}` : `Drag component here ${finalName}`}
      </div>
    </div>
  );
};
