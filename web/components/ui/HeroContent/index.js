import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './_hero-content.scss';
import Default from './templates/default';
import WithBackground from './templates/with-background';

const templates = {
  default: Default,
  'with-background': WithBackground
};

const HeroContent = ({ template = 'default', className = '', ...rest }) => {
  const TemplateToRender = templates[template] || templates.default;
  return (
    <div className={`sq-hero-content ${className}`}>
      <TemplateToRender {...rest} />
    </div>
  );
};

HeroContent.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  subHeader: PropTypes.string
};

export default HeroContent;
