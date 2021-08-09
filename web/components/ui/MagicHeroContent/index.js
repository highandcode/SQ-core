import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import Pencil from './pencil-effect';
import Basic from './basic-effect';

import './_magic-hero-content.scss';

const templates = {
  basic: Basic,
  pencil: Pencil
};

const MagicHeroContent = ({ name, items, template, className = '', ...rest }) => {
  const TemplateToRender = templates[template] || templates.pencil;
  return (
    <div className={`sq-magic-hero-content ${className}`}>
      <TemplateToRender
        name={name}
        className={className}
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
