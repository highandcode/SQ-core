import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import './_tag-label.scss';

const TagLabel = ({ className = '', value, iconName, variant = 'filled', color = 'primary' }) => {
  return (
    <div className={`sq-tag-label ${className} sq-tag-label--${variant} ${color}`}>
      <div className="sq-tag-label__container">
        {iconName && <Icon name={iconName} variant="normal" />}
        {value}
      </div>
    </div>
  );
};
TagLabel.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.any,
  row: PropTypes.object,
  tag: PropTypes.string,
  parentTag: PropTypes.string
};

export default TagLabel;
