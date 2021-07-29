import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Default from './default';
import './_image-info-slider.scss';

const templates = {
  default: Default
};

const ImageInfoSlider = ({ items, template, className = '', ...rest }) => {
  const TemplateToRender = templates[template] || templates.default;
  const containerEl = useRef(null);
  return (
    <div className={`sq-image-info-slider ${className}`} ref={containerEl}>
      <TemplateToRender
        {...{
          items
        }}
        {...rest}
      />
    </div>
  );
};

ImageInfoSlider.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array
};

export default ImageInfoSlider;
