import React from 'react';
import IconButton from '../../../components/ui/IconButton';
const Panel = ({ className, theme = 'default', header, children, enableFullScreen = false, onClose }) => {
  const [fullscreen, setFullScreen] = React.useState(false);
  const toggleFullscreen = () => {
    setFullScreen(!fullscreen);
  };
  return (
    <div className={`sq-c-panel sq-c-panel--${theme} ${fullscreen ? 'sq-c-panel--full-screen': ''} ${className} `}>
      <div className="sq-c-panel__container">
        {header && (
          <div className="sq-c-panel__header">
            {enableFullScreen && <IconButton
              className="sq-c-panel__full-screen"
              iconSize="small"
              color="black"
              iconName={fullscreen ? 'FullscreenExit' : 'Fullscreen'}
              onClick={toggleFullscreen}
            />}
            <h5 className="mb-none">{header}</h5>
            <IconButton
              className="sq-c-panel__close"
              iconSize="normal"
              color="black"
              iconName={'close'}
              onClick={onClose}
            />
          </div>
        )}
        <div className="sq-c-panel__body">{children}</div>
      </div>
    </div>
  );
};

export default Panel;
