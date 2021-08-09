import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './_image-on-device.scss';
import imageIphone from '../../../assets/img/iPhone.png';
import imageIpad from '../../../assets/img/iPad.png';
import { resolveImageUrl } from '../../../cordova';

const imageMap = {
  iphone: imageIphone,
  ipad: imageIpad,
  'ipad-a': imageIpad
};

const ImageOnDevice = ({ src, device = 'iphone', overlayImage, className = '' }) => {
  return (
    <div className={`sq-image-on-device sq-image-on-device--${device} ${className}`}>
      <div className="sq-image-on-device__overlay">
        <img src={resolveImageUrl(overlayImage || imageMap[device])} />
        <div className="sq-image-on-device__screen">
          <img src={resolveImageUrl(src)} />
        </div>
      </div>
    </div>
  );
};

ImageOnDevice.propTypes = {
  className: PropTypes.string,
  images: PropTypes.array
};

export default ImageOnDevice;
