import React, { useDrag } from 'react-dnd';
import _ from 'lodash';
import { ItemTypes } from './ItemTypes.js';

export const Component = ({ type, name, displayText, metaData, onSuccess }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: type || ItemTypes.COMPONENT,
      item: { name, metaData },
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          const isDropAllowed = dropResult.allowedDropEffect === 'any' || dropResult.allowedDropEffect === dropResult.dropEffect;
          if (isDropAllowed) {
            onSuccess && onSuccess(item, dropResult);
          }
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 'dragged' : 'default',
      }),
    }),
    [name]
  );
  return (
    <div className={`sq-component-list__item sq-component-list__item--${opacity}`} ref={drag}>
      {displayText}
    </div>
  );
};

export const ComponentList = ({ onDrop, compList = {}, filter }) => {
  const grouped = _.groupBy(
    Object.keys(compList)
      .map((key) => {
        return {
          name: key,
          displayText: key,
          ...compList[key],
        };
      })
      .filter((item) => {
        if (filter) {
          return filter.indexOf(item.group) > -1;
        }
        return true;
      }),
    'group'
  );
  return (
    <div className="sq-component-list">
      {Object.keys(grouped).map((group, idx) => {
        return (
          <div className="sq-component-list__group-wrapper" key={group}>
            <div className="sq-component-list__group">{group}</div>
            {grouped[group].map((comp, idx) => {
              return (
                <Component
                  type={comp.type}
                  key={idx}
                  name={comp.name}
                  displayText={comp.displayText}
                  metaData={comp}
                  onSuccess={(item) => {
                    onDrop && onDrop(item);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
