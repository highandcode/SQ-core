import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import common from '../../../../utils/common';
import { getMap } from '../../index';
import { resolveImageUrl } from '../../../../cordova';

const TemplateDefault = ({ name, eyebrow, header, headerTag = 'h1', bodyTag = 'p', subHeader, links, imageUrl, classes = {}, onAnalytics }) => {
  const HTag = headerTag;
  const BTag = bodyTag;
  const componentMap = getMap();

  return (
    <div className={`sq-hero-content--default ${name}`}>
      <div className={`sq-hero-content__root ${common.toStringBlank(classes.root)}`}>
        <div className="sq-hero-content__wrapper">
          <div className="sq-hero-content__content-col">
            {eyebrow && <div className={`sq-hero-content__eyebrow ${common.toStringBlank(classes.eyebrow)}`}>{ReactHtmlParser(eyebrow)}</div>}
            {header && <HTag className={`sq-hero-content__header ${common.toStringBlank(classes.header)}`}>{ReactHtmlParser(header)}</HTag>}
            {subHeader && <BTag className={`sq-hero-content__sub-header ${common.toStringBlank(classes.subHeader)}`}>{ReactHtmlParser(subHeader)}</BTag>}
            {links && (
              <div className={`sq-hero-content__links-container ${common.toStringBlank(classes.links)}`}>
                {links.map((link, idx) => {
                  const CompRender = componentMap.LinkButton;
                  return (
                    <CompRender className={`sq-hero-content__link ${common.toStringBlank(classes.link)}`} onAnalytics={onAnalytics} key={idx} {...link} />
                  );
                })}
              </div>
            )}
          </div>
          {imageUrl && (
            <div className={`sq-hero-content__content-image ${common.toStringBlank(classes.image)}`}>
              <div className="sq-hero-content__image">
                <img src={resolveImageUrl(imageUrl)} />
              </div>
            </div>
          )}
        </div>
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
