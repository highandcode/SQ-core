import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Icon from '../../../Icon';
import { getMap } from '../../index';

const renderPricingPlan = (data, onAnalytics) => {
  const { LinkButton } = getMap();
  return (
    <div className="sq-pricing__plan">
      <div className="sq-pricing__icon">{<Icon name={data.icon} color={data.iconVarant} variant="outline-icon" />}</div>
      <h2>{data.header}</h2>
      <h3>{data.price}</h3>
      <ul className="sq-pricing__featues-list">
        {data.features &&
          data.features.map((dataItem, idx) => {
            return (
              <>
                <div key={idx} className={`sq-pricing__feature-item ${dataItem.className}`}>
                  <Icon name={dataItem.icon} variant="none" />
                  <span className="sq-pricing__feature-item-text">{dataItem.text}</span>
                </div>
              </>
            );
          })}
      </ul>
      <div className="sq-pricing__actions">
        {data.actions &&
          data.actions.map((dataItem, idx) => {
            return (
              <>
                <LinkButton key={idx} {...dataItem} onAnalytics={onAnalytics} />
              </>
            );
          })}
      </div>
    </div>
  );
};

const TemplateDefault = ({ eyebrow, icon, header, headerTag = 'h1', bodyTag = 'p', subHeader, items, onAnalytics }) => {
  const HTag = headerTag;
  const BTag = bodyTag;

  return (
    <div className="sq-pricing--default">
      <div className="sq-pricing__wrapper">
        {icon && <Icon name={icon} />}
        {eyebrow && <div className={`sq-pricing__eyebrow`}>{ReactHtmlParser(eyebrow)}</div>}
        {header && <HTag className={`sq-pricing__header`}>{ReactHtmlParser(header)}</HTag>}
        {subHeader && <BTag className={`sq-pricing__sub-header`}>{ReactHtmlParser(subHeader)}</BTag>}
        {items && (
          <div className="container-fluid sq-pricing__links-container">
            <div className="row">
              {items.map((item, idx) => {
                return (
                  <div key={idx} className="col-xs-12 col-sm-4">
                    {renderPricingPlan(item, onAnalytics)}
                  </div>
                );
              })}
            </div>
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
