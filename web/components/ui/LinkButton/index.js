import React from 'react';
import PropTypes from 'prop-types';
import { redirectTo } from '../../../utils/redirect';
import Link from '../Link';
import Button from '../Button';

const linkButtonMap = {
  Link,
  Button
};

const LinkButton = ({
  to = '',
  children,
  color = 'primary',
  iconColor = 'none',
  className = '',
  onClick,
  iconSize,
  iconName,
  urlParams,
  buttonText,
  size = 'medium',
  type = 'Link',
  ...rest
}) => {
  const LinkToRender = linkButtonMap[type] || linkButtonMap.Link;
  return (
    <>
      {LinkToRender && (
        <LinkToRender
          className={className}
          iconName={iconName}
          iconColor={iconColor}
          color={color}
          urlParams={urlParams}
          size={size}
          buttonText={buttonText}
          to={to}
          {...rest}
          onClick={(e) => {
            onClick && onClick(e);
            to && redirectTo(to, urlParams, { ...rest });
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
