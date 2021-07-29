import React from 'react';
import PropTypes from 'prop-types';

const ImageSliderDefault = ({ items }) => {
  return (
    <div className={`sq-image-info-slider__template sq-image-info-slider__template-default`}>
      <div className="sq-image-info-slider__template-default-cnt">
        <ul className="sq-image-info-slider__template-default__list">
          {items &&
            items.map((item) => {
              return (
                <li className="sq-image-info-slider__template-default__list-item">
                  <div className="sq-image-info-slider__template-default__image">
                    <img src={item.imageUrl} />
                  </div>
                  <div className="sq-image-info-slider__template-default__banner">
                    <div className="sq-image-info-slider__template-default__eyebrow">{item.eyebrow}</div>
                    <div className="sq-image-info-slider__template-default__header">{item.header}</div>
                    <div className="sq-image-info-slider__template-default__description">{item.description}</div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

ImageSliderDefault.propTypes = {
  items: PropTypes.array
};

export default ImageSliderDefault;
