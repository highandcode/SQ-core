import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './_image.scss';
import { resolveImageUrl } from '../../../cordova';


const Image = ({ className = '', imageUrl, size = 'medium' }) => {
  return (
    <div className={`sq-image sq-image--${size} ${className}`}>
      <img src={resolveImageUrl(imageUrl)} />
    </div>
  );
};

Image.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string
};

export default Image;
