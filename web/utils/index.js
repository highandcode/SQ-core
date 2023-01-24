import apiBridge, { getParsers, addParsers, setErrorCodes } from './api-bridge';
import * as appEvents from './app-events';
import browser from './browser';

import common from './common';
import currency from './currency';
import * as datetime from './datetime';
import * as errorMessages from './error-messages';
import EventManager from './event-manager';
import CustomProcessor from './custom-processor';
import CustomModule from './custom-module';
import accentColors from './accent-colors';
import * as format from './format';
import * as object from '../../server/src/utils/object';
import path from './path';
import * as mask from './mask';
import * as number from './number';
import * as properties from './properties';
import * as queryString from './query-string';
import * as redirect from './redirect';
import * as timer from './timer';
import string from './string';
import cookie from './cookie-manager';
import * as translate from './translate';
import * as validator from './validator';

const processor = new CustomProcessor();
require('../../server/src/utils/special-validators')(validator);
export {
  apiBridge,
  appEvents,
  browser,
  common,
  currency,
  datetime,
  object,
  path,
  errorMessages,
  cookie,
  CustomModule,
  EventManager,
  CustomProcessor,
  format,
  mask,
  number,
  properties,
  queryString,
  accentColors,
  redirect,
  timer,
  translate,
  validator,
  processor,
  string,
  setErrorCodes,
  getParsers,
  addParsers
};
