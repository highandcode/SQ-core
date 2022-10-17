import React, { useEffect, useRef } from 'react';
import HtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

const HTML = ({ className = '', value = '', onAction }) => {
  const container = useRef();
  const handleClick = (e) => {
    if (e.target && (e.target.getAttribute('data-action-type') || e.target.getAttribute('href')?.indexOf('download-doc') > -1)) {
      e.stopPropagation();
      e.preventDefault();
      let actionType = e.target.getAttribute('data-action-type');
      if(e.target.getAttribute('href')?.indexOf('download-doc') > -1) {
        actionType = 'download-doc';
      }
      let params = {};
      for (var i = 0; i < e.target.attributes.length; i++) {
        params[e.target.attributes[i].name] = e.target.attributes[i].value;
      }
      onAction && onAction({}, { actionType, ...params });
    }
  };
  useEffect(() => {
    container.current.addEventListener('click', handleClick);
  }, []);
  return (
    <div className={`sq-html ${className}`}>
      <div className="sq-html__container" ref={container}>
        <div className="sq-html__html">{HtmlParser(value)}</div>
      </div>
    </div>
  );
};

HTML.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
};

export default HTML;
