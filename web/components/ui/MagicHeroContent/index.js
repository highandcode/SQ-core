import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Default from './default';

const templates = {
  default: Default
};

const MagicHeroContent = ({ items, template, className = '', ...rest }) => {
  const TemplateToRender = templates[template] || templates.default;
  return (
    <div className={`sq-magic-hero-content ${className}`}>
      <TemplateToRender
        {...{
          items
        }}
        {...rest}
      />
    </div>
  );
};

MagicHeroContent.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array
};

export default MagicHeroContent;
