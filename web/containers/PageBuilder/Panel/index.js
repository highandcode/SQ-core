import React from 'react';
import IconButton from '../../../components/ui/IconButton';
import './_panel.scss';
const Panel = ({ className, theme = 'default', header, children, onClose }) => {
  return (
    <div className={`sq-c-panel sq-c-panel--${theme} ${className} `}>
      <div className="sq-c-panel__container">
        {header && (
          <div className="sq-c-panel__header">
            <h4 className='mb-none'>{header}</h4>
            <IconButton className='sq-c-panel__close' iconSize='normal' color='black' iconName={'close'} onClick={onClose} />
          </div>
        )}
        <div className="sq-c-panel__body">{children}</div>
      </div>
    </div>
  );
};

export default Panel;
