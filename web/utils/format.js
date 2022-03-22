import { setDefaults, getFormatters as _getFormatters, setFormatters as _setFormatters } from '../../server/src/utils/format';
import { DateTime } from './datetime';
import { getSign, get } from './currency';

setDefaults({
  currency: {
    decimals: 0
  }
});

const formatters = {
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
    return oldFromatters.currency(value, { sign: '', currency, ...rest });
  },
  dateFull: (value, options = {}) => {
    return new DateTime(value).toString('MMM, DD YYYY');
  },
  shortDate: (value, { format = 'MM/DD/YY (ddd)' } = {}) => {
    return new DateTime(value).toString(format);
  },
  monthYear: (value, options = {}) => {
    return new DateTime(value).toString('MMM YYYY');
  },
  dateFullTime: (value, options = {}) => {
    return new DateTime(value).toString('MMM, DD YYYY hh:mm A');
  }
};
_setFormatters(formatters);
const addFormatter = (name, formatter) => {
  _setFormatters({
    [name]: formatter
  });
};

const getFormatters = () => {
  return { ..._getFormatters(), ...formatters };
};
const setFormatters = (newFormatters) => {
  return _setFormatters(newFormatters);
};

export { getFormatters, setFormatters, formatters, setDefaults, addFormatter };
