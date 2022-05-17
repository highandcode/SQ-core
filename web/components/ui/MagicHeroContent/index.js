import React from 'react';
import PropTypes from 'prop-types';
import Pencil from './pencil-effect';

import './_magic-hero-content.scss';

const templates = {
  pencil: Pencil
};

const MagicHeroContent = ({ name, items, template, ...rest }) => {
  const TemplateToRender = templates[template] || templates.pencil;
  return (
    <div className={`sq-magic-hero-content`}>
      <TemplateToRender
        name={name}
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
