import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from "react-html-parser";
import { resolveImageUrl } from '../../../cordova';
import './_header.scss';

const Header = ({ eyebrow, header, headerTag = 'h1', bodyTag = 'div', subHeader, className = '', imageUrl }) => {
  const HTag = headerTag;
  const BTag = bodyTag;
  return (
    <div className={`sq-header ${className}`}>
      {eyebrow && <div className={`sq-header__eyebrow`}>{ReactHtmlParser(eyebrow)}</div>}
      {header && <HTag className={`sq-header__header`}>{ReactHtmlParser(header)}</HTag>}
      {subHeader && <BTag className={`sq-header__sub-header`}>{ReactHtmlParser(subHeader)}</BTag>}
      {imageUrl && <img className="sq-header__image" src={resolveImageUrl(imageUrl)} />}
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  header: PropTypes.string,
  subHeader: PropTypes.string
};

export default Header;
