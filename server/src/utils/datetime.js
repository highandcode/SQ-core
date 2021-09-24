var moment = require('moment-timezone');

class MomentDateTime {
  constructor(inputDate, format) {
    if (inputDate && inputDate._date) {
      this._date = moment(inputDate._date._d);
    } else {
      this._date = (inputDate && moment(inputDate, format)) || moment();
    }
    this.namedFormats = {
      default: 'MM-DD-YYYY',
      shortMonth: 'MMM',
      month: 'MMM YYYY',
      short: 'Do MMM, YYYY',
      time: 'hh:mm:ss',
      time24: 'HH:mm:ss'
    };
  }

  getMiliseconds() {
    return this._date._d.getTime();
  }

  today() {
    this._date = this._date.startOf('day');
    return this;
  }

  startOf(input) {
    this._date = this._date.startOf(input);
    return this;
  }
  endOf(input) {
    this._date = this._date.endOf(input);
    return this;
  }
  diffInDays(otherDate) {
    return this._date.diff(otherDate._date, 'days');
  }
  diffInMonths(otherDate) {
    return this._date.diff(otherDate._date, 'months');
  }
  diffInWeeks(otherDate) {
    return this._date.diff(otherDate._date, 'weeks');
  }
  diffInYears(otherDate) {
    return this._date.diff(otherDate._date, 'years');
  }
  diffInHours(otherDate) {
    return this._date.diff(otherDate._date, 'hours');
  }
  diffInSeconds(otherDate) {
    return this._date.diff(otherDate._date, 'seconds');
  }
  diffInMinutes(otherDate) {
    return this._date.diff(otherDate._date, 'minutes');
  }

  addDays(input) {
    this._date.add(input, 'days');
    return this;
  }
  addMinutes(input) {
    this._date.add(input, 'minutes');
    return this;
  }
  addMonths(input) {
    this._date.add(input, 'months');
    return this;
  }

  date() {
    return this._date._d;
  }

  year() {
    return this._date.format('YYYY');
  }

  month() {
    return this._date.format('M');
  }
  startOfDay() {
    this._date.startOf('day');
    return this;
  }
  endOfDay() {
    this._date.endOf('day');
    return this;
  }
  toISO() {
    return this._date._d.toISOString();
  }
  isoWeekday() {
    return this._date.isoWeekday();
  }

  getTimeZoneStr() {
    return this._date.format().substr(this._date.format().indexOf('+'));
  }

  toStringDefault() {
    return this.toString('default');
  }

  toString(format) {
    return this._date.format(this.namedFormats[format] || format);
  }
}

module.exports = {
  DateTime: MomentDateTime,
  new: function (date) {
    return new MomentDateTime(date);
  },
  today: function () {
    return new MomentDateTime().today();
  },
  now: function () {
    return new MomentDateTime();
  },
  setDefaultTimeZone: function (tz) {
    moment.tz.setDefault(tz);
  }
};
console.log(new MomentDateTime().toString());
console.log(moment.tz('').zoneAbbr());
