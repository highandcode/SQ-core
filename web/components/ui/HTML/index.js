import React, { useEffect, useRef } from 'react';
import HtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

const HTML = ({ className = '', value = '', onAction }) => {
  const container = useRef();
  const handleClick = (e) => {
    if (e.target && e.target.getAttribute('data-action-type')) {
      var actionType = e.target.getAttribute('data-action-type');
      var href = e.target.getAttribute('href');
      var actionParams = e.target.getAttribute('data-action-params');
      let params = {};
      try {
        params = JSON.parse(actionParams);
      } catch (ex) {}
      onAction && onAction({ actionType, href, ...actionParams });
      e.stopPropagation();
      e.preventDefault();
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
