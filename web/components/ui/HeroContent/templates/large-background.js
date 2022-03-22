import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { common, object } from '../../../../utils';
import { getMap } from '../../index';
import { resolveImageUrl } from '../../../../cordova';

const TemplateWithBackground = ({
  background,
  eyebrow,
  header,
  headerTag = 'h1',
  className = '',
  bodyTag = 'p',
  subHeader,
  theme = 'default',
  links = [],
  links2 = [],
  onAnalytics,
  classes = {},
  userData
}) => {
  const HTag = headerTag;
  const BTag = bodyTag;
  const componentMap = getMap();
  return (
    <div className={`sq-hero-content--large-background ${className} sq-hero-content--large-background-theme-${theme}`}>
      <div
        className={`sq-hero-content__root ${common.toStringBlank(classes.root)}`}
        style={{ backgroundImage: `url(${resolveImageUrl(background)})` }}
      >
        <div className={`sq-hero-content__wrapper ${common.toStringBlank(classes.wrapper)}`}>
          <div className={`sq-hero-content__inner-wrapper ${common.toStringBlank(classes.innerWrapper)}`}>
            <div className={`sq-hero-content__body ${common.toStringBlank(classes.body)}`}>
              {eyebrow && (
                <div className={`sq-hero-content__eyebrow ${common.toStringBlank(classes.eyebrow)}`}>
                  {ReactHtmlParser(object.processMessage(eyebrow, userData))}
                </div>
              )}
              {header && (
                <HTag className={`sq-hero-content__header ${common.toStringBlank(classes.header)}`}>
                  {ReactHtmlParser(object.processMessage(header, userData))}
                </HTag>
              )}
              {subHeader && (
                <BTag className={`sq-hero-content__sub-header ${common.toStringBlank(classes.subHeader)}`}>
                  {ReactHtmlParser(object.processMessage(subHeader, userData))}
                </BTag>
              )}
              {links && (
                <div className={`sq-hero-content__links-container ${common.toStringBlank(classes.links)}`}>
                  {links.map((link, idx) => {
                    const CompRender = componentMap.LinkButton;
                    return <CompRender onAnalytics={onAnalytics} key={idx} {...link} />;
                  })}
                </div>
              )}
              {links2 && (
                <div className={`sq-hero-content__links2-container ${common.toStringBlank(classes.links2)}`}>
                  {links2.map((link, idx) => {
                    const CompRender = componentMap.LinkButton;
                    return <CompRender onAnalytics={onAnalytics} key={idx} {...link} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TemplateWithBackground.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  subHeader: PropTypes.string
};

export default TemplateWithBackground;
