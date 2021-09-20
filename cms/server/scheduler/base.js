class BaseScheduler {
  constructor({ scheduler, ...options } = {}) {
    this.options = options;
    this.scheduler = scheduler;
  }

  init() {}

  execute() {
    this.scheduler.log(`execute -> ${this.options.name}`);
    this.options.run && this.options.run(this.scheduler, this.options);
  }
}

module.exports = BaseScheduler;
