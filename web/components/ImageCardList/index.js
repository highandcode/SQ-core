import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageCard from '../ImageCard';
import {getMap} from '../../components/ui';
import { getValue } from '../../utils/properties';
import './_image-card-list.scss';


function ImageCardList({
  data,
  mode = 'tiles',
  onlyMode = false,
  tileStyle = 'default',
  disabledImage,
  disabledIcon,
  className = '',
  childClassName = '',
  noDataMessage = 'No data found',
  loader,
  titleField = 'name',
  tagLabel,
  tagColor,
  iconColor,
  pagination,
  title,
  iconName,
  imageUrl,
  iconNameField = 'icon',
  iconColorField = 'iconColor',
  tagSize,
  imageUrlField = 'imageUrl',
  tagFieldName = 'tag',
  tagColorField = 'tagColor',
  actions,
  onAction,
}) {
  const [finalMode, setMode] = useState(mode);
  const { Button } = getMap();
  return (
    <div
      className={`sq-image-card-list ${className} sq-image-card-list--style-${finalMode}`}
    >
      {!onlyMode && data && data.length > 0 && (
        <div className="sq-image-card-list__top mb-wide">
          <Button
            buttonText={'List'}
            size="small"
            iconSize={'small'}
            variant={`${finalMode === 'list' ? 'contained' : 'outlined'}`}
            iconName="list"
            onClick={() => setMode('list')}
          />
          <Button
            buttonText={'Tiles'}
            size="small"
            iconSize={'small'}
            variant={`${finalMode === 'tiles' ? 'contained' : 'outlined'}`}
            iconName="dashboard"
            onClick={() => setMode('tiles')}
          />
        </div>
      )}
      <div className="sq-image-card-list__wrapper">
        {loader && !data && loader}
        {data && data.length === 0 && (
          <div className="sq-image-card-list__no-data">{noDataMessage}</div>
        )}
        {data &&
          data.map((item, idx) => {
            const fTitle = getValue(this, item[titleField] || title, item);
            const fImageUrl = getValue(
              this,
              item[imageUrlField] || imageUrl,
              item
            );
            const tagValue = getValue(
              this,
              item[tagFieldName] || tagLabel,
              item
            );
            const tagColorValue = getValue(
              this,
              item[tagColorField] || tagColor,
              item
            );
            const finalActions = getValue(this, actions, item);
            const finalIcon = getValue(
              this,
              item[iconNameField] || iconName,
              item
            );
            const iconColor = getValue(
              this,
              item[iconColorField] || iconColor,
              item
            );
            return (
              <ImageCard
                key={idx}
                iconName={finalIcon}
                tagSize={tagSize}
                tileStyle={tileStyle}
                iconColor={iconColor}
                disabledImage={disabledImage}
                disabledIcon={disabledIcon}
                row={item}
                mode={finalMode}
                header={fTitle}
                tagLabel={tagValue}
                tagColor={tagColorValue}
                imageUrl={fImageUrl}
                className={childClassName}
                actions={finalActions}
                onAction={(e, action) => onAction && onAction(item, action)}
              />
            );
          })}
      </div>
    </div>
  );
}

ImageCardList.propTypes = {
  data: PropTypes.array,
  row: PropTypes.object,
  loader: PropTypes.node,
  className: PropTypes.string,
  childClassName: PropTypes.string,
  mode: PropTypes.string,
  onlyMode: PropTypes.bool,
  disabledImage: PropTypes.bool,
  disabledIcon: PropTypes.bool,
  noDataMessage: PropTypes.string,
  tileStyle: PropTypes.string,
  title: PropTypes.any,
  imageUrl: PropTypes.any,
  tagLabel: PropTypes.any,
  tagColor: PropTypes.any,
  iconName: PropTypes.any,
  iconColor: PropTypes.any,
  iconNameField: PropTypes.string,
  iconColorField: PropTypes.string,
  titleField: PropTypes.string,
  imageUrlField: PropTypes.string,
  tagFieldName: PropTypes.string,
  tagColorField: PropTypes.string,
  onAction: PropTypes.func,
  header: PropTypes.string,
  tagSize: PropTypes.string,
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
};

export default ImageCardList;
