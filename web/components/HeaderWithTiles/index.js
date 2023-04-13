import React from 'react';
import PropTypes from 'prop-types';
import './_header-with-tiles.scss';

const SQHeaderwithTiles = ({ header, data = [], className = 'mt-5 mb-5' }) => {
  return (
    <div className={`sq-header-with-tiles ${className}`}>
      <div className="sq-header-with-tiles__header">{header}</div>
      <div className="sq-header-with-tiles__container">
        {data?.map((dataItem) => {
          return (
            <div className="sq-header-with-tiles__item">
              <div className="sq-header-with-tiles__item-cnt">
                <div className="sq-header-with-tiles__top mb-wide">
                  <div className="sq-header-with-tiles__item-header">
                    {dataItem.header}
                  </div>
                  {dataItem.imageUrl && (
                    <div className="sq-header-with-tiles__img">
                      <img
                        src={dataItem.imageUrl}
                        alt={dataItem.imageAlt || 'Image'}
                      />
                    </div>
                  )}
                </div>
                <div className="sq-header-with-tiles__text">
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

SQHeaderwithTiles.propTypes = {
  data: PropTypes.array,
};

export default SQHeaderwithTiles;
