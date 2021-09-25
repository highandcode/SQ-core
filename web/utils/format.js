import { formatters as oldFromatters, setDefaults } from '../../server/src/utils/format';
import { DateTime } from './datetime';
import { getSign, get } from './currency';

setDefaults({
  currency: {
    decimals: 0
  }
});

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
    return oldFromatters.currency(value, { sign: '', currency, ...rest });
  },
  dateFull: (value, options = {}) => {
    return new DateTime(value).toString("MMM, DD YYYY")
  },
  monthYear: (value, options = {}) => {
    return new DateTime(value).toString("MMM YYYY")
  },
  dateFullTime: (value, options = {}) => {
    return new DateTime(value).toString("MMM, DD YYYY hh:mm A")
  }
};

export { formatters, setDefaults };
