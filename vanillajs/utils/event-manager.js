class Events {
  constructor(opts = {}) {
    this.eventMap = {};
    this.turnOn = true;
    this.opts = opts;
    if (this.opts.events) {
      Object.keys(this.opts.events).forEach((event) => {
        this.on(event, this.opts.events[event], this.opts.context);
      });
    }
  }

  checkEvent(name) {
    if (!this.eventMap[name]) {
      this.eventMap[name] = [];
    }
  }

  enable() {
    this.turnOn = true;
  }

  disable() {
    this.turnOn = false;
  }

  on(eventName, fn, context = null) {
    this.checkEvent(eventName);
    const eventWrapper = function () {
      if (this.turnOn) {
        return fn.apply(context || this.opts.context, arguments);
      }
    };
    eventWrapper.orginalFn = fn;
    this.eventMap[eventName].push(eventWrapper);
  }

  off(eventName, fn) {
    this.checkEvent(eventName);
    if (this.eventMap[eventName] && fn) {
      let index = 0;
      while (index < this.eventMap[eventName].length) {
        if (this.eventMap[eventName][index].orginalFn === fn) break;
        index++;
      }
      if (this.eventMap[eventName][index]) {
        this.eventMap[eventName].splice(index, 1);
      }
    } else if (this.eventMap[eventName]) {
      delete this.eventMap[eventName];
    }
  }

  emit(eventName) {
    const extra = [].splice.call(arguments, 1);
    let index = 0;
    if (this.eventMap[eventName]) {
      while (index < this.eventMap[eventName].length) {
        if (this.turnOn) {
          let result = this.eventMap[eventName][index].apply(this, extra);
          if (result === false) {
            break;
          }
        }
        index++;
      }
    }
  }
}

export default Events;
