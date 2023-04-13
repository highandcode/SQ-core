import React from 'react';
import PropTypes from 'prop-types';
import './_text-with-image-tiles.scss';

const SQTextWithImageTiles = ({ header, data = [], className = 'mt-5 mb-5' }) => {
  return (
    <div className={`sq-text-with-image-tiles ${className}`}>
      <div className="sq-text-with-image-tiles__header">
        {header}
      </div>
      <div className="sq-text-with-image-tiles__container">
        {data?.map((dataItem) => {
          return (
            <div className="sq-text-with-image-tiles__item">
              <div className="sq-text-with-image-tiles__item-cnt">
                {dataItem.imageUrl && (
                  <div className="sq-text-with-image-tiles__img">
                    <img
                      src={dataItem.imageUrl}
                      alt={dataItem.imageAlt || 'Image'}
                    />
                  </div>
                )}
                <div className="sq-text-with-image-tiles__text">
                  {dataItem.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

SQTextWithImageTiles.propTypes = {
  data: PropTypes.array,
};

export default SQTextWithImageTiles;
