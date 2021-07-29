import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { resolveImageUrl } from '../../../cordova';
import Icon from '../../Icon';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import { redirectTo } from '../../../utils/redirect';
import './_global-navigation.scss';

const renderSubNav = (item, isHover, callback) => {
  let iconName = !isHover ? 'expand' : 'collapse';
  return (
    item.children &&
    item.children.length > 0 && (
      <>
        {iconName && <Icon className="sq-global-navigation__list-icon" name={iconName} />}
        <ul className="sq-global-navigation__item-list">
          {item.children.map((child, idx) => {
            return (
              <li key={idx} className="sq-global-navigation__list-item">
                <a
                  onClick={(e) => {
                    if (e.defaultPrevented) return; // Exits here if event has been handled
                    e.preventDefault();
                    redirectTo(child.href, { ...child.params });
                    callback && callback();
                  }}
                  href={child.href}
                  className="sq-global-navigation__link"
                >
                  {child.title}
                </a>
              </li>
            );
          })}
        </ul>
      </>
    )
  );
};

const GlobalNavigation = ({ items, className, logo = {}, rightItems, onAnalytics }) => {
  const [open, setOpen] = useState(false);
  const [currentItemHover, setCurrentHover] = useState(null);
  const toggleMenu = () => {
    setOpen(!open);
  };
  const linksComps = { Button, LinkButton };
  return (
    <nav className={`sq-global-navigation ${className} ${open ? 'sq-global-navigation--open' : ''}`}>
      <div className="sq-global-navigation__wrapper">
        <a
          className={`sq-global-navigation__brand ${logo.className}`}
          onClick={(e) => {
            if (e.defaultPrevented) return; // Exits here if event has been handled
            e.preventDefault();
            redirectTo(logo.href, { ...logo.params });
          }}
        >
          {logo.name && <Icon name={logo.name} svg={logo.svg} variant={logo.variant} size={`${logo.size || 'large'}`} />}
          {logo.img && <img src={`${resolveImageUrl(logo.img)}`} alt={logo.imgAlt} />}
          <div className="sq-global-navigation__brand-text">{logo.text}</div>
        </a>
        <button
          className="sq-global-navigation__toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className={`sq-global-navigation__icon ${logo.className}`}>
            <Icon name="list" variant={logo.variant} size="large" />
          </span>
        </button>
        <div className={`sq-global-navigation__container${open ? ' sq-global-navigation__container--open' : ''}`}>
          <ul className="sq-global-navigation__nav">
            {items &&
              items.map((linkItem, idx) => {
                const isHover = linkItem === currentItemHover;
                return (
                  <li
                    key={idx}
                    className={`sq-global-navigation__item ${isHover ? 'sq-global-navigation__item--hover' : ''}`}
                    onMouseOver={() => {
                      setCurrentHover(linkItem, { ...linkItem.params });
                    }}
                    onMouseOut={() => {
                      setCurrentHover(null);
                    }}
                  >
                    <div className="sq-global-navigation__item-wrapper">
                      <a
                        onClick={(e) => {
                          if (e.defaultPrevented) return; // Exits here if event has been handled
                          e.preventDefault();
                          redirectTo(linkItem.href);
                          setOpen(false);
                        }}
                        className="sq-global-navigation__link"
                        href={linkItem.href}
                        className="sq-global-navigation__item-text"
                      >
                        {linkItem.title}
                      </a>
                      {renderSubNav(linkItem, isHover, () => {
                        setCurrentHover(null);
                        setOpen(false);
                      })}
                    </div>
                  </li>
                );
              })}
          </ul>
          <ul className="sq-global-navigation__nav sq-global-navigation__nav--right">
            {rightItems &&
              rightItems.map((ritem, idx) => {
                let Comp = linksComps.LinkButton;
                return (
                  <li>
                    <Comp
                      key={idx}
                      {...ritem}
                      onAnalytics={onAnalytics}
                      onClick={() => {
                        setOpen(false);
                      }}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

GlobalNavigation.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.object,
  items: PropTypes.array
};

export default GlobalNavigation;
