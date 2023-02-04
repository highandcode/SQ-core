import React from 'react';
import PropTypes from 'prop-types';
import { resolveImageUrl } from '../../../cordova';


const Image = ({ className = '', alt, imageUrl, size = 'medium', noImage = '' }) => {
  return (
    <div className={`sq-image sq-image--${size} ${className}`}>
      {imageUrl && <img alt={alt} src={resolveImageUrl(imageUrl)} />}
      {!imageUrl && noImage && <div className="sq-image__no-image">
        {noImage}
      </div>}
    </div>
  );
};

Image.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string
};

export default Image;
