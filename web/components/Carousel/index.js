import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';

import DefaultTemplate from './templates/default';
import FullBgTemplate from './templates/full-bg';
import './carousel.scss';

let templates = {
  default: DefaultTemplate,
  'full-bg': FullBgTemplate,
};

const addTemplate = (newTemplates) => {
  templates = {
    ...templates,
    ...newTemplates,
  };
};

const FullCarousel = ({
  carouselClassName = '',
  className = '',
  items = [],
  interval = 5000,
  navButtonsAlwaysVisible = true,
  template = 'default',
  animation = 'fade',
}) => {
  interval = interval * 1;
  const [now, setNow] = useState();
  const TemplateToRender = templates[template] || templates.default;
  const handleChange = (now) => {
    setNow(now);
  };
  return (
    <div className={`sq-carousel ${className} sq-carousel--${template}`}>
      <Carousel
        indicatorContainerProps={{
          className: 'sq-carousel__indicator-container',
        }}
        onChange={handleChange}
        className={carouselClassName}
        interval={interval}
        navButtonsAlwaysVisible={navButtonsAlwaysVisible}
        animation={animation}
        navButtonsAlwaysInvisible={navButtonsAlwaysVisible}
      >
        {items.map((item, i) => (
          <div
            key={now !== undefined && i === now ? i + Math.random() : i}
            className="sq-carousel__item"
          >
            <TemplateToRender data={item} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

FullCarousel.propTypes = {
  className: PropTypes.string,
  carouselClassName: PropTypes.string,
  animation: PropTypes.string,
  template: PropTypes.string,
  interval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  navButtonsAlwaysVisible: PropTypes.bool,
  items: PropTypes.array,
};

export default FullCarousel;
export { addTemplate };
