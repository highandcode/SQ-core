import { useDrop } from 'react-dnd';
import Icon from '../../components/Icon/index.js';
import { ItemTypes } from './ItemTypes.js';
import './_placeholder.scss';

function selectBackgroundColor(isActive, canDrop) {
  if (isActive) {
    return 'sq-placeholder-drop--active';
  } else if (canDrop) {
    return 'sq-placeholder-drop--can-drop';
  } else {
    return 'sq-placeholder-drop--default';
  }
}
export const Placeholder = ({ allowedDropEffect, onDrop, accept }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: accept || ItemTypes.COMPONENT,
      drop: (item, params) => {
        onDrop && onDrop(item, params);
        return ({
          name: `${allowedDropEffect}placeholder`,
          allowedDropEffect,
        })
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
  return (
    <div className={`sq-placeholder-drop ${backgroundCSS}`} ref={drop} style={{ }}>
      <Icon name="Move" variant={'extra1'} />
      <br />
      {isActive ? 'Release to drop' : 'Drag component here'}
    </div>
  );
};
