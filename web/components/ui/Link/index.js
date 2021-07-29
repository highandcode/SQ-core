import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import { redirectTo } from '../../../utils/redirect';
import './link.scss';

const Link = ({
  to = '',
  href = '#',
  children,
  className = '',
  onClick,
  size = 'normal',
  iconDirection = 'left',
  iconName,
  iconColor,
  iconSvg,
  buttonText,
  color = 'none',
  disabled,
  ...rest
}) => {
  const { target, analytics = {}, onAnalytics } = rest;
  const { click } = analytics;
  return (
    <a
      href={href}
      onClick={(e) => {
        !disabled && onClick && onClick(e);
        !disabled && to && redirectTo(to, {}, { target });
        if (to || href === '#') {
          e.preventDefault();
        }
        !disabled &&
          click &&
          onAnalytics &&
          onAnalytics({
            ...click
          });
      }}
      target={target}
      className={`sq-link sq-link--${size} ${className}${disabled ? ' sq-link--disabled' : ''}`}
    >
      <div className="sq-link__container">
        {iconDirection === 'left' && iconName && (
          <span className="sq-link__icon">{<Icon name={iconName} svg={iconSvg} variant={iconColor} size={size} />}</span>
        )}
        <span className="sq-link__text">{children || buttonText}</span>
        {iconDirection === 'right' && iconName && (
          <span className="sq-link__icon">{<Icon name={iconName} svg={iconSvg} variant={iconColor} size={size} />}</span>
        )}
      </div>
    </a>
  );
};
Link.propTypes = {
  size: PropTypes.string,
  iconDirection: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string
};

export default Link;
