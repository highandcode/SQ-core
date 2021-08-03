import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';
import { resolveImageUrl } from 'sq-core/web/cordova';
import Button from '../LinkButton';

const ImageSliderDefault = ({ className = '', items, interval = 5000, navButtons = true, animation = 'slide' }) => {
  return (
    <div className={`sq-image-info-slider__template sq-iis-tmp-default ${className}`}>
      <Carousel interval={interval} navButtonsAlwaysInvisible={navButtons} animation={animation}>
        {items &&
          items.map((item, idx) => {
            const { classes = {} } = item;
            return (
              <Paper key={idx}>
                <div className={`sq-iis-tmp-default__list-item ${classes.root || ''}`}>
                  <div className="sq-iis-tmp-default__list-item-cnt">
                    <div className="sq-iis-tmp-default__image">
                      <img src={resolveImageUrl(item.imageUrl)} />
                    </div>
                    <div className="sq-iis-tmp-default__right-content">
                      <div className={`sq-iis-tmp-default__banner ${classes.banner || ''}`}>
                        <div className="sq-iis-tmp-default__eyebrow">{item.eyebrow}</div>
                        <div className="sq-iis-tmp-default__header">{item.header}</div>
                        <div className="sq-iis-tmp-default__description">{item.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            );
          })}
      </Carousel>
    </div>
  );
};

ImageSliderDefault.propTypes = {
  items: PropTypes.array
};

export default ImageSliderDefault;
