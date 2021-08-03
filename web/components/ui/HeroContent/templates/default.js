import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { getMap } from '../../index';
import { resolveImageUrl } from '../../../../cordova';

const TemplateDefault = ({
  eyebrow,
  header,
  headerTag = 'h1',
  bodyTag = 'p',
  subHeader,
  links,
  imageUrl,
  animate,
  animation = 'default',
  visibilityDifference = 20,
  pageState = {},
  onAnalytics
}) => {
  const HTag = headerTag;
  const BTag = bodyTag;
  const eyebrowRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const componentMap = getMap();
  useEffect(() => {
    if (animate && eyebrowRef && eyebrowRef.current && !animated) {
      const elBound = eyebrowRef.current.getBoundingClientRect();
      if (elBound.y > 0) {
        const yVal = pageState.innerHeight - elBound.y;
        if (yVal > visibilityDifference && !animated && animate) {
          setAnimated(true);
        }
      }
    }
  });
  return (
    <div
      className={`sq-hero-content--default${animate && !animated ? ` sq-hero-content--animate-${animation}-reset` : ''}${
        animated ? ` sq-hero-content--animate-${animation}` : ''
      }`}
    >
      <div className="sq-hero-content__wrapper" ref={eyebrowRef}>
        {eyebrow && <div className={`sq-hero-content__eyebrow`}>{ReactHtmlParser(eyebrow)}</div>}
        {header && <HTag className={`sq-hero-content__header`}>{ReactHtmlParser(header)}</HTag>}
        {subHeader && <BTag className={`sq-hero-content__sub-header`}>{ReactHtmlParser(subHeader)}</BTag>}
        {links && (
          <div className="sq-hero-content__links-container">
            {links.map((link, idx) => {
              const CompRender = componentMap.LinkButton;
              return <CompRender className={`sq-hero-content__link`} onAnalytics={onAnalytics} key={idx} {...link} />;
            })}
          </div>
        )}
        {imageUrl && (
          <div className="sq-hero-content__image">
            <img src={resolveImageUrl(imageUrl)} />
          </div>
        )}
      </div>
    </div>
  );
};

TemplateDefault.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  subHeader: PropTypes.string
};

export default TemplateDefault;
