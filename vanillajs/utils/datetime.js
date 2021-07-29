import moment from 'moment';

class MomentDateTime {
  constructor(date) {
    if (date && date._date) {
      date = date._date;
    }
    this._date = moment(date) || moment();
  }

  add(num, type) {
    this._date.add(num, type);
    return this;
  }

  startOf(type) {
    this._date.startOf(type);
    return this;
  }
  endOf(type) {
    this._date.endOf(type);
    return this;
  }

  diff(date, type) {
    return this._date.diff(date._date || date, type);
  }

  year() {
    return this._date.year();
  }

  month() {
    return this._date.month();
  }

  week() {
    return this._date.week();
  }

  day() {
    return this._date.date();
  }

  minute() {
    return this._date.minute();
  }

  hour() {
    return this._date.hour();
  }
  weekDay() {
    return this._date.day();
  }

  date() {
    return new Date(this._date._d);
  }

  format(format) {
    return this._date.format(format);
  }
}

export { MomentDateTime };
export default MomentDateTime;
