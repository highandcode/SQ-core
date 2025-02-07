let turnOn = process.env.LOGGER_ENABLE || 'true';
let filter = process.env.LOGGER_FILTER || null;

module.exports = {
  filter: function (regex) {
    filter = regex;
  },
  clearFilter: function () {
    filter = null;
  },
  on: function () {
    turnOn = 'true';
  },
  off: function () {
    turnOn = 'false';
  },
  log: function (message) {
    var filterMesssage = JSON.stringify(message);
    if (turnOn === 'true' && (!filter || (filter && filterMesssage.match(filter)))) {
      console.log(message);
    }
  }
};