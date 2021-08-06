import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { getMap } from '../../index';
import { resolveImageUrl } from '../../../../cordova';

const TemplateWithBackground = ({ background, eyebrow, header, headerTag = 'h1', bodyTag = 'p', subHeader, links = [], onAnalytics, classes = {} }) => {
  const HTag = headerTag;
  const BTag = bodyTag;
  const componentMap = getMap();
  return (
    <div className="sq-hero-content--with-background" style={{ backgroundImage: `url(${resolveImageUrl(background)})` }}>
      <div className={`sq-hero-content__root ${classes.root}`}>
        <div className="sq-hero-content__wrapper">
          {eyebrow && <div className={`sq-hero-content__eyebrow`}>{ReactHtmlParser(eyebrow)}</div>}
          {header && <HTag className={`sq-hero-content__header`}>{ReactHtmlParser(header)}</HTag>}
          {subHeader && <BTag className={`sq-hero-content__sub-header`}>{ReactHtmlParser(subHeader)}</BTag>}
          {links && (
            <div className="sq-hero-content__links-container">
              {links.map((link, idx) => {
                const CompRender = componentMap.LinkButton;
                return <CompRender onAnalytics={onAnalytics} key={idx} {...link} />;
              })}
            </div>
          )}
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
