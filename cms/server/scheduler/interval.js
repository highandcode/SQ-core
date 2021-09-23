const BaseScheduler = require('./base');

class IntervalScheduler extends BaseScheduler {
  constructor(options) {
    super(options);
    this.options.type = 'interval';
  }

  getUnitByPeriod(period) {
    switch (period) {
      case 'h':
        return 60 * 60 * 1000;
      case 'm':
        return 60 * 1000;
      case 's':
        return 1000;
    }
  }

  getTimeunit(input) {
    const unit = input.match(/\d{0,}/)[0];
    const period = input.match(/[^\d]/)[0];
    return unit * this.getUnitByPeriod(period);
  }

  init() {
    if (this.options.runAtStart === true) {
      this.execute();
    }
    this.intervalId = setInterval(() => {
      this.execute();
    }, this.getTimeunit(this.options.frequency));
  }
}

module.exports = IntervalScheduler;
