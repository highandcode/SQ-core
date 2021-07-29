class EventManager {

  constructor() {
    this.events = {};
  }

  subscribe(evtName, fn) {
    if (!this.events[evtName]) {
      this.events[evtName] = [];
    }
    this.events[evtName].push(fn);
  }

  unsubscribe(evtName, fn) {
    if (this.events[evtName] && fn) {
      const idx = this.events[evtName].indexOf(fn);
      if (idx > -1) {
        this.events[evtName].splice(idx, 1);
      }
    } else if (this.events[evtName]) {
      delete this.events[evtName];
    }
  }

  emit(evtName, ...params) {
    if (this.events[evtName]) {
      this.events[evtName].forEach((fn) => {
        fn.apply(this, params);
      });
    }
  }
}

export default EventManager;