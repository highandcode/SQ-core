import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


class CompRenderer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { javascript } = this.props;
    if (javascript) {
      eval(javascript);
    }
  }
  render() {
    const { html, className = '' } = this.props;
    return <div className={`sq-comp-renderer ${className}`}>{ReactHtmlParser(html)}</div>;
  }
}

CompRenderer.propTypes = {
  className: PropTypes.string,
  html: PropTypes.string,
  javascript: PropTypes.string
};

export default CompRenderer;
