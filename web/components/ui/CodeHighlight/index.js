import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import hljs from 'highlight.js';

const CodeHighlight = ({ code, className, language = '' }) => {
  const codeBlock = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeBlock.current);
  });
  return (
    <div className={`sq-codehighlight ${className}`}>
      <pre className={`${language}`} ref={codeBlock}>
        {code}
      </pre>
    </div>
  );
};

CodeHighlight.propTypes = {
  className: PropTypes.string,
  code: PropTypes.string
};

export default CodeHighlight;
