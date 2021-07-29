import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CodeHighlight extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    if (this.codeEl && hljs) {
      hljs.highlightBlock(this.codeEl);
    }
  }
  render() {
    const { code, className, language = '' } = this.props;
    return (
      <div className={`sq-codehighlight ${className}`}>
        <pre
          className={`${language}`}
          ref={(el) => {
            this.codeEl = el;
          }}
        >
          {code}
        </pre>
      </div>
    );
  }
}

CodeHighlight.propTypes = {
  className: PropTypes.string,
  code: PropTypes.string
};

export default CodeHighlight;
