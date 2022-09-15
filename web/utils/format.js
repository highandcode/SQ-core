import {
  setDefaults,
  getFormatters as _getFormatters,
  setFormatters as _setFormatters,
} from '../../server/src/utils/format';
import { DateTime } from './datetime';
import { getSign, get } from './currency';

setDefaults({
  currency: {
    decimals: 0,
  },
});

const oldFromatters = _getFormatters();

const formatters = {
  ...oldFromatters,
  currency: (value, options = {}) => {
    const { currency = get(), ...rest } = options;
    const sign = getSign(currency);
    return oldFromatters.currency(value, { sign, currency, ...rest });
  },
  currencyAbr: (value, options = {}) => {
    const { currency = get(), ...rest } = options;
    const sign = getSign(currency);
    return oldFromatters.currencyAbr(value, { sign, currency, ...rest });
  },
  number: (value, options = {}) => {
    const { currency = get(), ...rest } = options;
    return oldFromatters.currency(value, {
      sign: '',
      currency: 'none',
      ...rest,
    });
  },
  numberAbr: (value, options = {}) => {
    const { ...rest } = options;
    return oldFromatters.currencyAbr(value, {
      sign: '',
      currency: 'none',
      ...rest,
    });
  },
  dateFull: (value, options = {}) => {
    return value ? new DateTime(value).toString('MMM, DD YYYY') : '';
  },
  dateForTimezone: (value, { timezone = 'America/New_York', format = 'MMM, DD YYYY hh:mm A zz' } = {}) => {
    return value ? new DateTime(value)._date.tz(timezone).format(format) : '';
  },
  shortDate: (value, { format = 'MM/DD/YY (ddd)' } = {}) => {
    return value ? new DateTime(value).toString(format) : '';
  },
  dateOnly: (value, { format = 'DD/MM' } = {}) => {
    return value ? new DateTime(value).toString(format) : '';
  },
  monthYear: (value, options = {}) => {
    return value ? new DateTime(value).toString('MMM YYYY') : '';
  },
  dateFullTime: (value, options = {}) => {
    return value ? new DateTime(value).toString('MMM, DD YYYY hh:mm A') : '';
  },
  time: (value, options = {}) => {
    return value ? new DateTime(value).toString('hh:mm A') : '';
  },
};
_setFormatters(formatters);
const addFormatter = (name, formatter) => {
  _setFormatters({
    [name]: formatter,
  });
};

const getFormatters = () => {
  return { ..._getFormatters(), ...formatters };
};
const setFormatters = (newFormatters) => {
  return _setFormatters(newFormatters);
};

export { getFormatters, setFormatters, formatters, setDefaults, addFormatter };
