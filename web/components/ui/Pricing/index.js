import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Default from './templates/default';

const templates = {
  default: Default
};

const HeroContent = ({ eyebrow, template = 'default', header, headerTag = 'h1', bodyTag = 'div', subHeader, className = '', ...rest }) => {
  const TemplateToRender = templates[template] || templates.default;
  const containerEl = useRef(null);
  return (
    <div className={`sq-pricing ${className}`} ref={containerEl}>
      <TemplateToRender
        {...{
          eyebrow,
          header,
          subHeader,
          headerTag,
          bodyTag
        }}
        {...rest}
      />
    </div>
  );
};

HeroContent.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  subHeader: PropTypes.string
};

export default HeroContent;
