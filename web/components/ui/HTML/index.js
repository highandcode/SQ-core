import React from 'react';
import HtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

const HTML = ({ className = '', value = '' }) => {
  return (
    <div className={`sq-html ${className}`}>
      <div className="sq-html__container">
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
