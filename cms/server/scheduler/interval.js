const BaseScheduler = require('./base');
const Timeunit = require('../../../server/src/utils/time-unit');

class IntervalScheduler extends BaseScheduler {
  constructor(options) {
    super(options);
    this.options.type = 'interval';
    this.timeUnit = new Timeunit();
  }

  init() {
    if (this.options.runAtStart === true) {
      this.execute();
    }
    this.intervalId = setInterval(() => {
      this.execute();
    }, this.timeUnit.getTimeunit(this.options.frequency));
  }
}

module.exports = IntervalScheduler;
