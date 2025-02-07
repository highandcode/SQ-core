const Interval = require('./interval');

class JobScheduler {
  constructor({ jobs, interval, ...options } = {}) {
    this.options = options;
    this.jobs = jobs;
    this.jobTypes = {
      interval: interval || Interval
    };
  }

  log(message) {
    console.log(`JobScheduler:: ${message}`);
  }

  schedule() {
    this.log('start');
    Object.keys(this.jobs).forEach((job) => {
      const config = this.jobs[job];
      new this.jobTypes[config.type]({
        scheduler: this,
        name: job,
        ...config
      }).init();
      console.log(`job-> ${job} type:${config.type}|${config.frequency}`);
    });
  }
}

module.exports = JobScheduler;
