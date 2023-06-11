import { setDefaults, getDefaults, getFormatters as _getFormatters, setFormatters as _setFormatters } from '../../server/src/utils/format';
import { DateTime } from './datetime';
import { getSign, get } from './currency';

setDefaults({
  date: {},
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
    const { format = 'MMM, DD YYYY' } = { ...(getDefaults().date?.dateFull || {}), ...options };
    return value ? new DateTime(value).toString(format) : '';
  },
  dateForTimezone: (value, options = {}) => {
    const { timezone = 'America/New_York', format = 'MMM, DD YYYY hh:mm A zz' } = { ...(getDefaults().date?.dateForTimezone || {}), ...options };
    return value ? new DateTime(value)._date.tz(timezone).format(format) : '';
  },
  shortDate: (value, options = {}) => {
    const { format = 'MM/DD/YY (ddd)' } = { ...(getDefaults().date?.shortDate || {}), ...options };
    return value ? new DateTime(value).toString(format) : '';
  },
  dateOnly: (value, options = {}) => {
    const { format = 'DD/MM' } = { ...(getDefaults().date?.dateOnly || {}), ...options };
    return value ? new DateTime(value).toString(format) : '';
  },
  monthYear: (value, options = {}) => {
    const { format = 'MMM YYYY' } = { ...(getDefaults().date?.monthYear || {}), ...options };
    return value ? new DateTime(value).toString(format) : '';
  },
  dateFullTime: (value, options = {}) => {
    const { format = 'MMM, DD YYYY hh:mm A' } = { ...(getDefaults().date?.dateFullTime || {}), ...options };
    return value ? new DateTime(value).toString(format) : '';
  },
  time: (value, options = {}) => {
    const { format = 'MMM, DD YYYY hh:mm A' } = { ...(getDefaults().date?.time || {}), ...options };
    return value ? new DateTime(value).toString(format) : '';
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
