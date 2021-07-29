import React from 'react';
import PropTypes from 'prop-types';
import { redirectTo } from '../../../utils/redirect';
import { getMap } from '../index';

// const linkButtonMap = {
//   Link,
//   Button
// };

const LinkButton = ({
  to = '',
  children,
  color = 'primary',
  iconColor = 'none',
  className = '',
  onClick,
  iconSize,
  iconName,
  urlPrams,
  buttonText,
  size = 'normal',
  type = 'Link',
  ...rest
}) => {
  const linkButtonMap = getMap();
  const LinkToRender = linkButtonMap[type] || linkButtonMap.Link;
  return (
    <>
      {LinkToRender && (
        <LinkToRender
          className={className}
          iconName={iconName}
          iconColor={iconColor}
          color={color}
          size={size}
          buttonText={buttonText}
          {...rest}
          onClick={(e) => {
            onClick && onClick(e);
            to && redirectTo(to, urlPrams, { ...rest });
          }}
        ></LinkToRender>
      )}
    </>
  );
};
LinkButton.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  iconSize: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  iconName: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string
};

export default LinkButton;
