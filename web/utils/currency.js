
const currency = {
  USD: 'US Dollar',
  INR: 'Indian Rupee',
  AUD: 'Australian Dollar',
  EUR: 'Euro',
  JPY: 'Japanese Yen',
  GBP: 'Pounds',
  RUB: 'Russian ruble',
  AED: 'Emirati dirham',
  CAD: 'Canadian dollar'
};

const signs = {
  USD: '$',
  CAD: '$',
  INR: '₹',
  GBP: '£',
  AUD: '$',
  EUR: '€',
  AED: 'د.إ',
  RUB: '₽',
  JPY: '¥'
};

Object.keys(currency).forEach((currKey) => {
  if (signs[currKey]) {
    currency[currKey] = '(' + signs[currKey] + ') ' + currency[currKey];
  }
});

let currentCurrency = localStorage.getItem('currency') || 'USD';


const set = (newCurr) => {
  if (currency[newCurr]) {
    currentCurrency = newCurr;
    localStorage && localStorage.setItem('currency', newCurr);
  }
};

const get = () => {
  return currentCurrency;
};

const getSign = (curr) => {
  return signs[curr] || signs[currentCurrency];
};


export default currency;

export {
  currency,
  signs,
  set,
  get,
  getSign
};