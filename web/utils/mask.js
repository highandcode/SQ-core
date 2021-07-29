import { formatters as oldFromatters } from '../../server/src/utils/format';
import { isNullOrUndefined } from '../../server/src/utils/common';
import { getSign, get } from './currency';

const masks = {
  currency: {
    mask: (value, options = {}) => {
      return oldFromatters.currency(value, { sign: getSign(), currency: get(), input: true, decimals: 2, ...options });
    },
    unmask: (value, options = {}) => {
      return value && value.toString().replace(/[^0-9.-]/g, '');
    }
  },
  number: {
    mask: (value, { pattern = '', param = 'D' }) => {
      let out = '';
      if (pattern) {
        const allValues = pattern.split('');
        const valueArra = value.toString().split('');
        let idx = 0;

        allValues.forEach((digit) => {
          if (digit === param) {
            out += valueArra[idx] || '';
            idx++;
          } else if (idx < valueArra.length) {
            out += digit;
          }
        });
      }
      return out;
    },
    unmask: (value) => {
      return value && value.toString().replace(/[^0-9.]/g, '');
    }
  },
  phone: {
    mask: (value) => {
      value = isNullOrUndefined(value) ? '' : value.toString();
      const x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      if (!x) {
        return value;
      }
      return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    },
    unmask: (value) => {
      return value && value.toString().replace(/[^0-9]/g, '');
    }
  },
  percentage: {
    mask: (value, { input = false }) => {
      if (!input) {
        return value + '%';
      } else {
        return value;
      }
    },
    unmask: (value) => {
      return value && value.toString().replace(/[^0-9.-]/g, '');
    }
  }
};

export { masks };
