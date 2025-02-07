import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Tooltip from '@mui/material/Tooltip';
import { getMap } from '../ui';
// import Icon from '../../components/Icon';
// import Actions from '../../components/Actions';
// import TagLabel from '../../components/ui/TagLabel';
// import MoreActions from '../../components/MoreActions';

import './_image-card.scss';

function ImageCard({
  header,
  mode,
  row,
  iconName,
  iconColor = 'primary',
  tagSize,
  tileStyle = 'default',
  imageUrl,
  disabledImage = false,
  disabledIcon = false,
  className = '',
  onChange,
  onAction,
  actions = [],
  tagLabel,
  tagColor = 'primary',
}) {
  const styles =
    imageUrl && !disabledImage ? { backgroundImage: `url(${imageUrl})` } : {};
  const { Icon, Actions, TagLabel, MoreActions } = getMap();
  return (
    <div
      className={`sq-image-card ${className} sq-image-card--style-${mode} sq-image-card--t-style-${tileStyle}`}
    >
      <div className="sq-image-card__container">
        <div style={styles} className="sq-image-card__img-container">
          {!imageUrl && !disabledIcon && (
            <Icon
              className="sq-image-card__no-image"
              size="large"
              name={iconName || 'HideImage'}
              color={iconColor}
            />
          )}
          <div className="sq-image-card__overlay"></div>
          <Actions
            className="sq-image-card__actions sq-actions--vertical"
            row={row}
            actions={actions}
            onAction={onAction}
          />
        </div>
        <div className="sq-image-card__content-container">
          <div className="sq-image-card__text-wrapper">
            <div className="sq-image-card__outer-text">
              {iconName && (
                <Icon
                  className="sq-image-card__text-icon"
                  size="large"
                  name={iconName}
                  color={iconColor}
                />
              )}
              <div className="sq-image-card__text">
                <Tooltip title={header}>
                  <span>{header}</span>
                </Tooltip>
              </div>
            </div>
            <div className="sq-image-card__extra">
              {tagLabel && (
                <TagLabel
                  className="sq-image-card__tag"
                  size={tagSize}
                  color={tagColor}
                  value={tagLabel}
                ></TagLabel>
              )}
            </div>
          </div>
          <MoreActions
            className="sq-image-card__more-actions"
            row={row}
            actions={actions}
            onAction={onAction}
          />
        </div>
      </div>
    </div>
  );
}

ImageCard.propTypes = {
  options: PropTypes.oneOf([PropTypes.array, PropTypes.func]),
  value: PropTypes.oneOf([PropTypes.array, PropTypes.func]),
  row: PropTypes.object,
  className: PropTypes.string,
  mode: PropTypes.string,
  actionType: PropTypes.string,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  disabledImage: PropTypes.bool,
  disabledIcon: PropTypes.bool,
  tileStyle: PropTypes.string,
  onChange: PropTypes.func,
  onAction: PropTypes.func,
  header: PropTypes.string,
  tagLabel: PropTypes.string,
  tagColor: PropTypes.string,
  actions: PropTypes.array,
  tagSize: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default ImageCard;
