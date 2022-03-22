import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { object } from '../../../utils';
import { resolveImageUrl } from '../../../cordova';
import './_header.scss';

const Header = ({ eyebrow, header, headerTag = 'h1', bodyTag = 'div', subHeader, className = '', imageUrl, userData }) => {
  const HTag = headerTag;
  const BTag = bodyTag;
  console.log(userData);
  return (
    <div className={`sq-header ${className}`}>
      {eyebrow && <div className={`sq-header__eyebrow`}>{ReactHtmlParser(object.processMessage(eyebrow, userData))}</div>}
      {header && <HTag className={`sq-header__header`}>{ReactHtmlParser(object.processMessage(header, userData))}</HTag>}
      {subHeader && <BTag className={`sq-header__sub-header`}>{ReactHtmlParser(object.processMessage(subHeader, userData))}</BTag>}
      {imageUrl && <img className="sq-header__image" src={resolveImageUrl(object.processMessage(imageUrl, userData))} />}
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
