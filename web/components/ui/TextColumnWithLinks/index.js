import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Default from './default';
import './_text-column-links.scss';

const templates = {
  default: Default
};

const ImageInfoSlider = ({ items, template, className = '', ...rest }) => {
  const TemplateToRender = templates[template] || templates.default;
  const containerEl = useRef(null);
  return (
    <div className={`sq-text-column-links ${className}`} ref={containerEl}>
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
