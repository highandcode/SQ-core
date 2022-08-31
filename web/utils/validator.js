import { translate } from './translate';
import cookieMgr from '../utils/cookie-manager';
import { Validator, addValidator, getValidators, addMessage, getMessages } from '../../server/src/utils/validator';

Validator.parseMessage = (message) => {
  return translate(message);
};
addValidator('hasCookieValue', (value, { cookieName }) => {
  return !!cookieMgr.getAll()[cookieName];
});

addValidator('cookieValue', (value, { cookieName }) => {
  return cookieMgr.getAll()[cookieName] === value;
});

export { Validator, addValidator, getValidators, addMessage, getMessages };
