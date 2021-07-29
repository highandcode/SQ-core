import $ from '../$';
import utils from '../utils';
import Dom from './dom';
const { EventManager } = utils;

class Component {
  constructor(el, config = {}) {
    this.$ = $;
    this.el = $(el)[0];
    this.$el = $(el);
    this.config = config;
    this.utils = utils;
    this.domMgr = new Dom();
    this.events = new EventManager({
      events: this.config.events,
      context: this
    });
    this._internalEvents = new EventManager({
      context: this
    });
  }

  getConfig(configKey) {
    return !this.utils.common.isNullOrUndefined(this.config[configKey]) ? this.config[configKey] : null;
  }

  setConfig(configKey, value) {
    if (this.config[configKey] != value) {
      this.config[configKey] = value;
      this.onKeySet && this.onKeySet(configKey, value);
    }
  }

  $on(el, eventName, selector, fn, context) {
    if (typeof selector === 'function') {
      fn = selector;
      selector = undefined;
    }
    var that = context || this;
    el.on(eventName, selector, function () {
      fn.apply(that, [].slice.call(arguments).concat([this]));
    });
    return this;
  }

  $off(el, eventName, fn) {
    el.off(eventName, fn);
    return this;
  }

  debounce(func, wait = 250, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

export default Component;
