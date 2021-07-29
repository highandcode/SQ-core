/*!
 * sq-daterange-slider v0.0.1 https://github.com/swishqube/swishqube-daterange-slider#readme
 * License ISC
 * Copyright 2019-2020 Swish Qube Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('moment')) :
  typeof define === 'function' && define.amd ? define(['moment'], factory) :
  (global = global || self, global.SQDateRangeSlider = factory(global.moment));
}(this, function (moment) { 'use strict';

  moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

  const passiveEvents = ['scroll', 'wheel', 'touchmove', 'touchstart', 'touchend']; // All possible prefixes of an event

  const eventPrefixes = ['webkit', 'moz', 'ms', 'o']; // Events which are browser dependent

  const irregularEvents = ['transitionend']; // List of all styles

  const stylesList = document.createElement('div').style; // All possible prefixes of a css property

  const cssPrefixes = ['Webkit', 'Moz', 'ms', 'O', 'css', 'style']; // Properties to be applied to get correct element styles

  const cssShow = {
    visibility: 'hidden',
    display: 'block' // Special Events

  };
  const specialEvents = ['focus', 'blur', 'click']; // Map to cache computed correct style names

  const correctStyleName = {};

  var _getEvent = function (e, target) {
    return {
      altKey: e.altKey,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      changedTouches: e.changedTouches,
      ctrlKey: e.ctrlKey,
      detail: e.detail,
      eventPhase: e.eventPhase,
      metaKey: e.metaKey,
      pageX: e.pageX,
      pageY: e.pageY,
      shiftKey: e.shiftKey,
      view: e.view,
      'char': e.char,
      key: e.key,
      keyCode: e.keyCode,
      button: e.button,
      buttons: e.buttons,
      clientX: e.clientX,
      clientY: e.clientY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      pointerId: e.pointerId,
      pointerType: e.pointerType,
      screenX: e.screenX,
      screenY: e.screenY,
      targetTouches: e.targetTouches,
      toElement: e.toElement,
      touches: e.touches,
      type: e.type,
      which: e.which,
      target: e.target,
      currentTarget: target,
      originalEvent: e,
      stopPropagation: function () {
        e.stopPropagation();
      },
      stopImmediatePropagation: function () {
        e.stopImmediatePropagation();
      },
      preventDefault: function () {
        if (passiveEvents.indexOf(e.type) === -1) {
          e.preventDefault();
        }
      }
    };
  };

  var isPartOfDOM = function isPartOfDOM(target) {
    return target.ownerDocument && target.ownerDocument.body.contains(target) || target.nodeName === '#document' || target.nodeName === 'HTML' || target === window;
  };

  var _getDelegator = function (fn, selector) {
    return function (e) {
      // Get the element the event was raised by.
      let target = e.target; // Loop parents.

      if (selector) {
        selector = _normalizeSelector(selector);

        while (target && target !== this) {
          // Check if the current target matches
          if (target.matches && target.matches(_normalizeSelector(selector))) {
            fn.call(target, _getEvent(e, target));
          }

          target = target.parentNode;
        }
      } else {
        if (isPartOfDOM(target)) {
          fn.call(target, _getEvent(e, target));
        }
      }
    };
  };

  var jQuery = function (selector, context) {
    return new DomObject(selector, context);
  };

  var _normalizeSelector = function (selector) {
    if (selector && typeof selector == 'string') {
      // Modified the regex to handle the spaces before '>'
      return selector.replace(/^\s*>/g, ':scope >').replace(/,\s*>/g, ', :scope >');
    }

    return selector;
  };

  var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === 'function' && typeof obj.nodeType !== 'number';
  };

  var $ = jQuery;
  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    // The default length of a jQuery object is 0
    length: 0,
    contains: function (obj) {
      if (!obj) return false;

      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          if (this.contains(obj[i]) && this != obj[i]) return true;
        }

        return false;
      }

      for (let i = 0; i < this.length; i++) {
        let node = obj;

        while (node) {
          if (node == this[i] || node[0] && node[0].isEqualNode(this[i])) {
            return true;
          }

          node = node.parentNode;
        }
      }

      return false;
    },
    findVisible: function (selector) {
      const $els = this.find(selector);

      for (let i = $els.length - 1; i >= 0; i--) {
        if (!$($els[i]).isVisible()) {
          $els.splice(i, 1);
        }
      }

      return $els;
    },
    // Encode URL parameters
    formatParams: function (params) {
      var formattedParams = `${Object.keys(params).map(function (key) {
      return `${key}=${encodeURIComponent(params[key])}`;
    }).join('&')}`;
      return formattedParams ? formattedParams : '';
    },
    // Takes a request object for making http requests using XMLHttpRequest
    ajax: function (request) {
      const xhr = new XMLHttpRequest();
      const data = this.formatParams(request.data); // Add request params to the URL for GET request 

      if (request.method.toUpperCase() === 'GET') {
        request.url = data ? request.url + '?' + data : request.url;
      } // Make it async.


      xhr.open(request.method, request.url, true); // Set with credentials.

      if (request.withCredentials) {
        xhr.withCredentials = true;
      } // Set with CORS


      if (request.crossDomain) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      } // Set headers.


      for (const header in request.headers) {
        if (Object.prototype.hasOwnProperty.call(request.headers, header)) {
          xhr.setRequestHeader(header, request.headers[header]);
        }
      }

      if (!Object.prototype.hasOwnProperty.call(request.headers, 'Content-Type')) {
        // Set json data type
        if (request.dataType === 'json') {
          xhr.setRequestHeader('Content-Type', 'application/json');
        } else {
          //Set deafult Content-Type
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
      } // Set events.


      xhr.onload = function () {
        if (xhr.status == 200) {
          let data = xhr.responseText;

          if (request.dataType === 'json') {
            data = JSON.parse(data);
          }

          request.done(data, xhr.status, xhr);
        } else {
          request.fail(xhr);
        }
      }; // Send data.


      xhr.send(data);
    },
    // Get all previous siblings of an element
    prevAll: function () {
      const res = $();

      if (!this[0]) {
        return res;
      }

      let elem = this[0];

      while (elem && elem.previousSibling) {
        elem = elem.previousSibling;
        res.push(elem);
      }

      return res;
    },
    // Determine the position of an element within the set
    index: function (elem) {
      // No argument, return index in parent
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      } // Index in selector


      if (typeof elem === 'string') {
        return [].indexOf.call($(elem), this[0]);
      } // Locate the position of the desired element


      return [].indexOf.call(this, // If it receives a jQuery object, the first element is used
      elem.length ? elem[0] : elem);
    },
    isVisible: function () {
      if (!this[0]) {
        return false;
      }

      return !!(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length);
    },
    toArray: function () {
      return [].slice.call(this);
    },
    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {
      // Return all the elements in a clean array
      if (num == null) {
        return [].slice.call(this);
      } // Return just the one element from the set


      return num < 0 ? this[num + this.length] : this[num];
    },
    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function (elems) {
      // Build a new jQuery matched element set
      const ret = jQuery.merge(this.constructor(), elems); // Add the old object onto the stack (as a reference)

      ret.prevObject = this; // Return the newly-formed element set

      return ret;
    },
    wrapAll: function (html) {
      let wrap;

      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0]);
        } // The elements to wrap the target around


        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }

        wrap.map(function () {
          let elem = this;

          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }

          return elem;
        }).append(this);
      }

      return this;
    },
    wrapInner: function (wrapper) {
      if (typeof wrapper === 'string') {
        const wrapperProps = wrapper.split(' ');
        let i = 0; // Remove all empty props

        while (i < wrapperProps.length && wrapperProps[i].trim().length === 0) i++; // First non-empty property is the element itself


        if (i < wrapperProps.length) {
          wrapper = document.createElement(wrapperProps[i].trim());
          i++;
        } // Make sure it is re-initialized


        if (typeof wrapper !== 'string') {
          // Add all wrapper attributes
          const $wrapper = $(wrapper);

          for (; i < wrapperProps.length; i++) {
            wrapperProps[i] = wrapperProps[i].trim();
            const attr = wrapperProps[i].split('=');
            $wrapper.attr(attr[0], attr[1].replace('"', ''));
          }
        }
      }

      while (!this[0].firstChild && this[0].firstChild !== wrapper) {
        wrapper.appendChild(this[0].firstChild);
      }
    },
    wrap: function (html) {
      const htmlIsFunction = isFunction(html);
      return this.each(function (i) {
        $(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function () {
      return this.parent().each(function () {
        if (!(this.nodeName && this.nodeName.toLowerCase() === name.toLowerCase())) {
          jQuery(this).replaceWith(this.childNodes);
        }
      });
    },
    grep: function (elems, callback, invert) {
      let callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert; // Go through the array, only saving the items
      // that pass the validator function

      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);

        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }

      return matches;
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function () {
      return this.pushStack([].slice.apply(this, arguments));
    },
    each: function (fn) {
      if (this.length) {
        for (let i = 0; i < this.length; i++) {
          if (fn.call(this[i], i, this[i]) === false) {
            break;
          }
        }
      }

      return this;
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (i) {
      const len = this.length,
            j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    empty: function () {
      for (let i = 0; i < this.length; i++) {
        this[i].innerHTML = '';
      }
    },
    contents: function () {
      const ret = $();

      for (let i = 0; i < this.length; i++) {
        const cldrn = this[i].childNodes;

        for (let j = 0; j < cldrn.length; j++) {
          ret.push(cldrn[j]);
        }
      }

      return ret;
    },
    attr: function (name, val) {
      if (typeof name === 'object') {
        for (let k in name) {
          if (Object.prototype.hasOwnProperty.call(name, k)) {
            if (name[k] !== null) {
              this.attr(k, name[k]);
            }
          }
        }

        return this;
      }

      if (typeof val !== 'undefined') {
        if (name === 'checked') {
          for (let i = 0; i < this.length; i++) {
            this[i].checked = val;
          }
        } else if (name === 'tagName') {
          for (let i = 0; i < this.length; i++) {
            this[i].tagName = val;
          }
        } else {
          for (let i = 0; i < this.length; i++) {
            this[i].setAttribute(name, val);
          }
        } // Chain.


        return this;
      } else {
        if (this.length === 0 || !(this[0].getAttribute || name === 'checked')) {
          return undefined;
        }

        if (name === 'checked') {
          return this[0].checked;
        } else if (name === 'tagName') {
          return this[0].tagName;
        }

        return this[0].getAttribute(name);
      }
    },
    removeAttr: function (name) {
      for (let i = 0; i < this.length; i++) {
        if (this[i].removeAttribute) this[i].removeAttribute(name);
      }

      return this;
    },
    hide: function () {
      this.css('display', 'none');
      return this;
    },
    show: function () {
      this.css('display', 'block');
      return this;
    },
    focus: function () {
      if (this.length) {
        this[0].focus();
      }

      return this;
    },
    blur: function () {
      if (this.length) {
        this[0].blur();
      }

      return this;
    },
    data: function (name, val) {
      // Object.
      if (typeof val !== 'undefined') {
        for (let i = 0; i < this.length; i++) {
          this[i]['data-' + name] = val;

          if (typeof val !== 'object' && typeof val !== 'function') {
            if (this[i].setAttribute) {
              this[i].setAttribute('data-' + name, val);
            }
          }
        } // Chain.


        return this;
      } else {
        if (typeof val !== 'undefined') {
          return this.attr('data-' + name, val);
        } else {
          if (this.length === 0) return undefined;

          for (let i = 0; i < this.length; i++) {
            let dt = this[i]['data-' + name];

            if (typeof dt === 'undefined' || dt === null) {
              if (this[i].getAttribute) {
                dt = this[i].getAttribute('data-' + name);
              }
            }

            if (typeof dt != 'undefined' && dt != null) {
              return dt;
            }
          }

          return undefined;
        }
      }
    },
    removeData: function (name) {
      for (let i = 0; i < this.length; i++) {
        if (this[i].removeAttribute) this[i].removeAttribute('data-' + name);
        this[i]['data-' + name] = null;
      }

      return this;
    },
    getCorrectStyleName: function (name) {
      // Compute only if not computed before
      if (!correctStyleName[name]) {
        let finalName; // If a style with same name exists then it is the original name

        if (name in stylesList) {
          finalName = name;
        } // Make first letter capital


        let capName = name[0].toUpperCase() + name.slice(1); // Try attaching the prefixes and checking if it is a valid style name

        let i = cssPrefixes.length;

        while (i--) {
          name = cssPrefixes[i] + capName;

          if (name in stylesList) {
            finalName = name;
          }
        } // Store for future use


        correctStyleName[name] = finalName;
      }

      return correctStyleName[name];
    },
    css: function (name, val) {
      if (typeof val !== 'undefined') {
        if (this.length === 0) return this;

        if ((typeof val === 'string' && val.trim() !== '' && !isNaN(val) || typeof val === 'number') && /(margin)|(padding)|(height)|(width)|(top)|(left)|(right)|(bottom)/gi.test(name) && !/(line-height)/gi.test(name)) {
          val = val + 'px';
        }

        for (let i = 0; i < this.length; i++) {
          // Make sure the style name is correct
          name = $(this).getCorrectStyleName(name);
          this[i].style[name] = val;
        }

        return this;
      } else if (typeof name == 'string') {
        if (this.length === 0) return undefined;
        const doc = this[0].ownerDocument || document;
        const win = doc.defaultView || doc.parentWindow; // Make sure the style name is correct

        name = $(this).getCorrectStyleName(name);
        return win.getComputedStyle(this[0])[name];
      } else {
        for (let key in name) {
          if (Object.prototype.hasOwnProperty.call(name, key)) {
            this.css(key, name[key]);
          }
        }

        return this;
      }
    },
    toggleClass: function (name, val) {
      if (name.split(' ').length > 1) {
        const names = name.split(' ');

        for (let i = 0; i < names.length; i++) {
          this.toggleClass(names[i], val);
        }

        return this;
      }

      for (let i = 0; i < this.length; i++) {
        if (typeof val === 'undefined') {
          if (this[i].classList.contains(name)) {
            this[i].classList.remove(name);
          } else {
            this[i].classList.add(name);
          }
        } else {
          if (val) {
            if (!this[i].classList.contains(name)) {
              this[i].classList.add(name);
            }
          } else {
            if (this[i].classList.contains(name)) {
              this[i].classList.remove(name);
            }
          }
        }
      }

      return this;
    },
    addClass: function (name) {
      if (name.length === 0) return this;

      if (name.split(' ').length > 1) {
        const names = name.split(' ');

        for (let i = 0; i < names.length; i++) {
          this.addClass(names[i]);
        }

        return this;
      }

      for (let i = 0; i < this.length; i++) {
        this[i].classList.add(name);
      }

      return this;
    },
    removeClass: function (name) {
      if (name.split(' ').length > 1) {
        const names = name.split(' ');

        for (let i = 0; i < names.length; i++) {
          names[i] = names[i].trim();

          if (names[i].length) {
            this.removeClass(names[i]);
          }
        }

        return this;
      }

      for (let i = 0; i < this.length; i++) {
        if (name.length) {
          this[i].classList.remove(name);
        }
      }

      return this;
    },
    getClass: function getClass(elem) {
      return elem.getAttribute && elem.getAttribute('class') || '';
    },
    stripAndCollapse: function stripAndCollapse(value) {
      const rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
      const tokens = value.match(rnothtmlwhite) || [];
      return tokens.join(' ');
    },
    hasClass: function (selector) {
      let className,
          elem,
          i = 0;
      className = ' ' + selector + ' ';

      while (elem = this[i++]) {
        if (elem.nodeType === 1 && (' ' + $(this).stripAndCollapse($(this).getClass(elem)) + ' ').indexOf(className) > -1) {
          return true;
        }
      }

      return false;
    },
    scrollTop: function (val) {
      if (typeof val !== 'undefined') {
        for (let i = 0; i < this.length; i++) {
          if (this[i] === document) {
            window.scrollTo(document.documentElement.scrollLeft, val);
          } else {
            this[i].scrollTop = val;
          }
        }
      } else {
        if (this.length === 0) return undefined;

        if (this[0] === document) {
          return document.documentElement.scrollTop;
        }

        return this[0].scrollTop;
      }
    },
    scrollLeft: function (val) {
      if (typeof val !== 'undefined') {
        for (let i = 0; i < this.length; i++) {
          if (this[i] === document) {
            window.scrollTo(val, document.documentElement.scrollTop);
          } else {
            this[i].scrollLeft = val;
          }
        }
      } else {
        if (this.length === 0) return undefined;

        if (this[0] === document) {
          return document.documentElement.scrollLeft;
        }

        return this[0].scrollLeft;
      }
    },
    on: function (eventName, selector, fn) {
      if (eventName.split(' ').length > 1) {
        const events = eventName.split(' ');

        for (let i = 0; i < events.length; i++) {
          // If it is a browser dependent or irregular event
          if (irregularEvents.indexOf(eventName) !== -1) {
            // Bind all events created by attaching all possible prefixes
            for (let j = 0; j < eventPrefixes.length; j++) {
              this.on(eventPrefixes[j] + eventName[0].toUpperCase() + eventName.slice(1), selector, fn);
            }
          } else {
            this.on(events[i], selector, fn);
          }
        } // Chain.


        return this;
      }

      if (typeof selector === 'function') {
        fn = _getDelegator(selector, null);
      } else {
        fn = _getDelegator(fn, selector);
      }

      for (let i = 0; i < this.length; i++) {
        const $el = $(this[i]);

        if (!$el.data('events')) {
          $el.data('events', []);
        }

        const eventHandlers = $el.data('events');
        eventHandlers.push([eventName, fn]);
        let domEvent = eventName.split('.');
        domEvent = domEvent[0];

        if (passiveEvents.indexOf(domEvent) >= 0) {
          $el.get(0).addEventListener(domEvent, fn, {
            passive: true
          });
        } else {
          $el.get(0).addEventListener(domEvent, fn);
        }
      }
    },
    off: function (eventName) {
      if (eventName.split(' ').length > 1) {
        const events = eventName.split(' ');

        for (let i = 0; i < events.length; i++) {
          this.off(events[i]);
        } // Chain.


        return this;
      }

      for (let i = 0; i < this.length; i++) {
        const $el = $(this[i]);
        const eventHandlers = $el.data('events');

        if (eventHandlers) {
          let domEvent = eventName.split('.');
          domEvent = domEvent[0];
          const eventHandlers = $el.data('events') || [];

          for (let k = eventHandlers.length - 1; k >= 0; k--) {
            const eventHandler = eventHandlers[k];

            if (eventHandler[0] == eventName) {
              $el.get(0).removeEventListener(domEvent, eventHandler[1]);
              eventHandlers.splice(k, 1);
            }
          }
        }
      }
    },
    trigger: function (type) {
      for (let i = 0; i < this.length; i++) {
        let event; // If it is a mouse event

        if (typeof Event === 'function') {
          if (type.search(/^mouse/g) >= 0) {
            event = new MouseEvent(type, {
              view: window,
              cancelable: true,
              bubbles: true
            });
          } else {
            event = new Event(type);
          }
        } else {
          // If it is a mouse event
          if (type.search(/^mouse/g) >= 0) {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          } else {
            event = document.createEvent('Event');
            event.initEvent(type, true, true);
          }
        } // Handle special events separately


        if (specialEvents.indexOf(type) >= 0 && typeof this[i][type] === 'function') {
          this[i][type]();
        } else {
          this[i].dispatchEvent(event);
        }
      }
    },
    triggerHandler: function () {},
    val: function (new_val) {
      if (typeof new_val != 'undefined') {
        for (let i = 0; i < this.length; i++) {
          this[i].value = new_val;
        }

        return this;
      } else {
        return this[0].value;
      }
    },
    siblings: function () {
      return $(this[0]).parent().children().not(this);
    },
    find: function (selector) {
      const ret = $();

      if (typeof selector !== 'string') {
        for (let i = 0; i < selector.length; i++) {
          for (let j = 0; j < this.length; j++) {
            if (this[j] !== selector[i] && $(this[j]).contains(selector[i])) {
              ret.push(selector[i]);
              break;
            }
          }
        }

        return ret;
      }

      const isElement = function (o) {
        return typeof HTMLElement === 'object' ? o instanceof HTMLElement : //DOM2
        o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
      };

      selector = _normalizeSelector(selector);

      for (let i = 0; i < this.length; i++) {
        if (this[i].querySelectorAll) {
          let els = [];

          if (selector && typeof selector == 'string') {
            els = this[i].querySelectorAll(selector);
          } else if (isElement(selector)) {
            els = [selector];
          }

          for (let j = 0; j < els.length; j++) {
            ret.push(els[j]);
          }
        }
      }

      return ret;
    },
    children: function () {
      const ret = $();

      for (let i = 0; i < this.length; i++) {
        const cldrn = this[i].children;

        for (let j = 0; j < cldrn.length; j++) {
          ret.push(cldrn[j]);
        }
      }

      return ret;
    },
    not: function (selector) {
      if (typeof selector === 'string') {
        for (let i = this.length - 1; i >= 0; i--) {
          if (this[i].matches(selector)) {
            this.splice(i, 1);
          }
        }
      } else {
        if (selector instanceof jQuery) {
          for (let i = this.length - 1; i >= 0; i--) {
            for (let j = 0; j < selector.length; j++) {
              if (this[i] === selector[j]) {
                this.splice(i, 1);
                break;
              }
            }
          }
        } else {
          for (let i = this.length - 1; i >= 0; i--) {
            if (this[i] === selector[0]) {
              this.splice(i, 1);
            }
          }
        }
      }

      return this;
    },
    add: function (ary) {
      for (let i = 0; i < ary.length; i++) {
        this.push(ary[i]);
      }

      return this;
    },
    closest: function (selector) {
      for (let i = 0; i < this.length; i++) {
        const clst = this[i].closest && this[i].closest(selector);
        if (clst) return $(clst);
      }

      return $();
    },
    html: function (str) {
      if (typeof str == 'undefined') {
        if (this.length === 0) return undefined;
        return this[0].innerHTML;
      }

      if (typeof str === 'string') {
        for (let i = 0; i < this.length; i++) {
          this[i].innerHTML = str; // If any of the child nodes are scripts then run them

          let children = this[i].children;
          let doc = this[i].ownerDocument || document;

          for (let j = 0; j < children.length; j++) {
            if (children[j].tagName === 'SCRIPT') {
              const script = doc.createElement('script');
              script.innerHTML = children[j].innerHTML;
              doc.head.appendChild(script).parentNode.removeChild(script);
            }
          }
        }
      } else {
        this[0].innerHTML = '';
        this.append(str[0]); // Execute if it is script tag

        let doc = this[0].ownerDocument || document;

        if (str[0].tagName === 'SCRIPT') {
          const script = doc.createElement('script');
          script.innerHTML = str[0].innerHTML;
          doc.head.appendChild(script).parentNode.removeChild(script);
        }
      }

      return this;
    },
    text: function (content) {
      if (content) {
        for (let i = 0; i < this.length; i++) {
          this[i].textContent = content;
        }
      } else {
        if (!this.length) return '';
        return this[0].textContent;
      }
    },
    after: function (content) {
      if (content) {
        if (typeof content == 'string') {
          for (let i = 0; i < this.length; i++) {
            const after = this[i];

            if (after.nodeType != Node.ELEMENT_NODE) {
              const doc = after.ownerDocument;
              const tmp = doc.createElement('SPAN');
              $(after).after(tmp);
              $(tmp).after(content).remove();
            } else {
              after.insertAdjacentHTML('afterend', content);
            }
          }
        } else {
          const after = this[0];

          if (after.nextSibling) {
            if (content instanceof jQuery) {
              for (let i = 0; i < content.length; i++) {
                after.nextSibling.parentNode.insertBefore(content[i], after.nextSibling);
              }
            } else {
              after.nextSibling.parentNode.insertBefore(content, after.nextSibling);
            }
          } else {
            $(after.parentNode).append(content);
          }
        }
      }

      return this;
    },
    clone: function (deep) {
      const ret = $();

      for (let i = 0; i < this.length; i++) {
        ret.push(this[i].cloneNode(deep));
      }

      return ret;
    },
    replaceWith: function (content) {
      if (typeof content === 'string') {
        for (let i = 0; i < this.length; i++) {
          if (this[i].parentNode) {
            this[i].outerHTML = content;
          }
        }
      } else if (content.length) {
        for (let i = 0; i < this.length; i++) {
          this.replaceWith(content[i]);
        }
      } else {
        this.after(content).remove();
      }
    },
    insertBefore: function (el) {
      $(el).before(this[0]);
      return this;
    },
    before: function (content) {
      if (content instanceof jQuery) {
        for (let i = 0; i < content.length; i++) {
          this.before(content[i]);
        }

        return this;
      }

      if (content) {
        if (typeof content == 'string') {
          for (let i = 0; i < this.length; i++) {
            const before = this[i];

            if (before.nodeType != Node.ELEMENT_NODE) {
              const doc = before.ownerDocument;
              const tmp = doc.createElement('SPAN');
              $(before).before(tmp);
              $(tmp).before(content).remove();
            } else {
              if (before.parentNode) {
                before.insertAdjacentHTML('beforebegin', content);
              }
            }
          }
        } else {
          const before = this[0];

          if (before.parentNode) {
            if (content instanceof jQuery) {
              for (let i = 0; i < content.length; i++) {
                before.parentNode.insertBefore(content[i], before);
              }
            } else {
              before.parentNode.insertBefore(content, before);
            }
          }
        }
      }

      return this;
    },
    append: function (content) {
      if (this.length == 0) return this;

      if (typeof content == 'string') {
        for (let i = 0; i < this.length; i++) {
          const parent = this[i];
          const doc = parent.ownerDocument;
          const tmp = doc.createElement('SPAN');
          $(parent).append(tmp);
          $(tmp).after(content).remove();
        }
      } else {
        if (content instanceof jQuery || Array.isArray(content)) {
          for (let i = 0; i < content.length; i++) {
            this.append(content[i]);
          }
        } else {
          if (typeof content !== 'function') {
            this[0].appendChild(content);
          }
        }
      }

      return this;
    },
    prepend: function (content) {
      if (this.length == 0) return this;

      if (typeof content == 'string') {
        for (let i = 0; i < this.length; i++) {
          const parent = this[i];
          const doc = parent.ownerDocument;
          const tmp = doc.createElement('SPAN');
          $(parent).prepend(tmp);
          $(tmp).before(content).remove();
        }
      } else {
        if (content instanceof jQuery) {
          for (let i = 0; i < content.length; i++) {
            this.prepend(content[i]);
          }
        } else {
          const parent = this[0];

          if (!parent.firstChild) {
            $(parent).append(content);
          } else {
            if (parent.firstChild) {
              parent.insertBefore(content, parent.firstChild);
            } else {
              parent.appendChild(content);
            }
          }
        }
      }

      return this;
    },
    remove: function () {
      for (let i = 0; i < this.length; i++) {
        if (this[i].parentNode) {
          this[i].parentNode.removeChild(this[i]);
        }
      }

      return this;
    },
    prev: function () {
      // replicate the jQuery behavior
      if (this.length && this[0].previousElementSibling) {
        return $(this[0].previousElementSibling);
      } else {
        return $();
      }
    },
    next: function () {
      if (this.length && this[0].nextElementSibling) {
        return $(this[0].nextElementSibling);
      } else {
        return $();
      }
    },
    outerHeight: function (margin) {
      if (this.length === 0) return undefined;
      const el = this[0];

      if (el === el.window) {
        return el.innerHeight;
      } // Remember the old values, and insert the new ones


      const old = {};
      const isVisible = this.isVisible();

      if (!isVisible) {
        for (const name in cssShow) {
          old[name] = el.style[name];
          el.style[name] = cssShow[name];
        }
      }

      let height = el.offsetHeight;

      if (margin) {
        height += parseInt($(el).css('marginTop')) + parseInt($(el).css('marginBottom'));
      } // Revert the old values


      if (!isVisible) {
        for (const name in cssShow) {
          el.style[name] = old[name];
        }
      }

      return height;
    },
    outerWidth: function (margin) {
      if (this.length === 0) return undefined;
      const el = this[0];

      if (el === el.window) {
        return el.outerWidth;
      } // Remember the old values, and insert the new ones


      const old = {};
      const isVisible = this.isVisible();

      if (!isVisible) {
        for (const name in cssShow) {
          old[name] = el.style[name];
          el.style[name] = cssShow[name];
        }
      }

      let width = el.offsetWidth;

      if (margin) {
        width += parseInt($(el).css('marginLeft')) + parseInt($(el).css('marginRight'));
      } // Revert the old values


      if (!isVisible) {
        for (const name in cssShow) {
          el.style[name] = old[name];
        }
      }

      return width;
    },
    width: function (newWidth) {
      if (newWidth === undefined) {
        if (this[0] instanceof HTMLDocument) {
          return this[0].body.offsetWidth;
        }

        return this[0].offsetWidth;
      } else {
        this[0].style.width = newWidth + 'px';
      }
    },
    height: function (newHeight) {
      const elem = this[0];

      if (newHeight === undefined) {
        if (elem instanceof HTMLDocument) {
          const doc = elem.documentElement;
          return Math.max(elem.body.scrollHeight, doc.scrollHeight, elem.body.offsetHeight, doc.offsetHeight, doc.clientHeight);
        }

        return elem.offsetHeight;
      } else {
        elem.style.height = newHeight + 'px';
      }
    },
    is: function (el) {
      if (this.length === 0) return false;

      if (typeof el == 'string' && this[0].matches) {
        return this[0].matches(el);
      } else if (el instanceof jQuery) {
        return this[0] == el[0];
      } else {
        return this[0] == el;
      }
    },
    parent: function () {
      if (this.length === 0) return $();
      return $(this[0].parentNode);
    },
    parents: function (selector) {
      const ret = $();

      for (let i = 0; i < this.length; i++) {
        let el = this[i].parentNode;

        while (el && el != document && el.matches) {
          if (selector) {
            if (el.matches(selector)) {
              ret.push(el);
            }
          } else {
            ret.push(el);
          }

          el = el.parentNode;
        }
      }

      return ret;
    },
    parentsUntil: function (until, selector) {
      const ret = $();

      if (until instanceof jQuery && until.length > 0) {
        until = until[0];
      }

      for (let i = 0; i < this.length; i++) {
        let el = this[i].parentNode;

        while (el && el != document && el.matches && el != until && this[i] != until && !(typeof until == 'string' && el.matches(until))) {
          if (selector) {
            if (el.matches(selector)) {
              ret.push(el);
            }
          } else {
            ret.push(el);
          }

          el = el.parentNode;
        }
      }

      return ret;
    },
    insertAfter: function (elem) {
      const parentNode = elem.parent()[0];

      if (parentNode) {
        parentNode.insertBefore(this[0], elem[0].nextElementSibling);
      }
    },
    filter: function (fn) {
      const ret = $();

      if (typeof fn === 'function') {
        for (let i = 0; i < this.length; i++) {
          if (fn.call(this[i], this[i])) {
            ret.push(this[i]);
          }
        }
      } else if (typeof fn === 'string') {
        for (let i = 0; i < this.length; i++) {
          if (this[i].matches(fn)) {
            ret.push(this[i]);
          }
        }
      }

      return ret;
    },
    offset: function () {
      const rect = this[0].getBoundingClientRect();
      const win = this[0].ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },
    position: function () {
      return {
        left: this[0].offsetLeft,
        top: this[0].offsetTop
      };
    },
    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: [].push,
    splice: [].splice
  };

  jQuery.extend = function (new_obj) {
    new_obj = new_obj || {}; // Loop arguments.

    for (let i = 1; i < arguments.length; i++) {
      if (!arguments[i]) continue;

      for (let key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) new_obj[key] = arguments[i][key];
      }
    }

    return new_obj;
  };

  jQuery.merge = function (first, second) {
    let len = +second.length,
        j = 0,
        i = first.length;

    for (; j < len; j++) {
      first[i++] = second[j];
    }

    first.length = i;
    return first;
  };

  jQuery.map = function (elems, callback, arg) {
    let length,
        value,
        i = 0,
        ret = []; // Go through the array, translating each of the items to their new values

    if (Array.isArray(elems)) {
      length = elems.length;

      for (; i < length; i++) {
        value = callback(elems[i], i, arg);

        if (value != null) {
          ret.push(value);
        }
      } // Go through every key on the object,

    } else {
      for (i in elems) {
        value = callback(elems[i], i, arg);

        if (value != null) {
          ret.push(value);
        }
      }
    } // Flatten any nested arrays


    return [].concat.apply([], ret);
  };

  var DomObject = function (selector, context) {
    if (!selector) {
      return this;
    }

    if (typeof selector == 'string' && selector[0] === '<') {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = selector;
      return $(tmp.firstElementChild);
    }

    context = context instanceof jQuery ? context[0] : context;

    if (typeof selector == 'string') {
      selector = _normalizeSelector(selector);
      const els = (context || document).querySelectorAll(selector);

      for (let i = 0; i < els.length; i++) {
        this[i] = els[i];
      }

      this.length = els.length;
      return this;
    } else {
      if (!(selector instanceof jQuery)) {
        this[0] = selector;
        this.length = 1;
        return this;
      }

      return selector;
    }
  };

  DomObject.prototype = jQuery.prototype;

  class Classes {
    generate(config = {}) {
      Object.keys(config).forEach(key => {
        const set = config[key];
        config[key] = this.generateClasses(set);
      });
      return config;
    }

    generateClasses(config = {}) {
      config.root = config.root || "";
      config.main = "main";
      Object.keys(config).forEach(key => {
        if (key !== "prefix") {
          let elemOrMod = "__";
          let keyToRender = config[key];

          if (config[key].substr(0, 2) === "m:") {
            elemOrMod = "--";
            keyToRender = config[key].substr(2);
          }

          config[key] = config.prefix + (keyToRender ? elemOrMod + keyToRender : "");
        }
      });
      return config;
    }

  }
  var classes = new Classes();

  const toNum = num => {
    return (num * 1).toFixed(2) * 1;
  };
  const toString = (num, fixedTo = 2) => {
    return (num * 1).toFixed(fixedTo);
  };
  var number = {
    toNum,
    toString
  };

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

  class Events {
    constructor(opts = {}) {
      this.eventMap = {};
      this.turnOn = true;
      this.opts = opts;

      if (this.opts.events) {
        Object.keys(this.opts.events).forEach(event => {
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
      this.turnOn = true;
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
          this.eventMap[eventName] = this.eventMap[eventName].splice(index, 1);
        }
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

  var utils = {
    classes,
    number,
    MomentDateTime,
    EventManager: Events
  };

  class DOM {
    constructor() {
      this.$ = jQuery;
    }

    offset(el) {
      el = this.$(el);
      return {
        left: el[0].offsetLeft,
        top: el[0].offsetTop
      };
    }

  }

  const {
    EventManager
  } = utils;

  class Component {
    constructor(el, config = {}) {
      this.$ = jQuery;
      this.el = el;
      this.$el = jQuery(el);
      this.config = config;
      this.utils = utils;
      this.dom = new DOM();
      this.events = new EventManager({
        events: this.config.events,
        context: this
      });
      this._internalEvents = new EventManager({
        context: this
      });
    }

    getConfig(configKey) {
      return this.config[configKey] || null;
    }

    setConfig(configKey, value) {
      if (this.config[configKey] != value) {
        this.config[configKey] = value;
        this.onKeySet && this.onKeySet(configKey, value);
      }
    }

    $on(el, eventName, selector, fn, context) {
      if (typeof selector === "function") {
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

  class Module {
    constructor() {
      this.$ = jQuery;
      this.events = new Events();
    }

  }

  class BaseModule extends Module {
    constructor(slider) {
      super();
      this.slider = slider;
      this.utils = utils;
    }

  }

  var defaults = {
    MODULES: {},
    PLUGINS: {},
    INSTANCES: [],
    DEFAULTS: {},
    version: "0.0.1"
  };

  function SQDateRangeSlider(selector, options, initCallback) {
    if (typeof selector === 'string') {
      let els = document.querySelectorAll(selector);

      if (options && options.iframe_document) {
        els = options.iframe_document.querySelectorAll(selector);
      }

      const inst = [];

      for (let i = 0; i < els.length; i++) {
        let existing_instance = els[i]['data-sqdr.instance'];

        if (existing_instance) {
          console.warn('SQDateRangeSlider:instance already exists.');
          inst.push(existing_instance);
        } else {
          inst.push(new SQDateRangeSlider.Bootstrap(els[i], options, initCallback));
        }
      } // Only one element.


      if (inst.length == 1) {
        return inst[0];
      }

      return inst;
    }

    return new SQDateRangeSlider.Bootstrap(selector, options, initCallback);
  }

  SQDateRangeSlider.registerPlugins = function (plgList) {
    for (let i = 0; i < plgList.length; i++) {
      plgList[i].call(SQDateRangeSlider);
    }
  };

  SQDateRangeSlider.defaults = function (options) {
    Object.assign(SQDateRangeSlider.DEFAULTS, options);
  };

  SQDateRangeSlider.registerPlugin = function (name, plugin) {
    SQDateRangeSlider.PLUGINS[name] = plugin;
  };

  SQDateRangeSlider.registerModule = function (name, module) {
    SQDateRangeSlider.MODULES[name] = module;
  };

  Object.assign(SQDateRangeSlider, defaults);

  const iconSizes = {
    medium: "sq-icon--md",
    large: "sq-icon--large",
    xl: "sq-icon--large"
  };
  const ICON_DATA = {
    defaultTemplate: "SVG",
    iconTemplate: (icon, size = "") => `<div class="sq-icon ${iconSizes[size] || ""}">${icon}</div>`,
    templates: {
      SVG: `<?xml version='1.0' encoding='utf-8'?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
      SVG_CONTENT
    </svg>
    `,
      FA5: `<i class="far fa-FA5_NAME-retro"></i>`,
      TEXT: `<span class="sq-icon-text">TEXT</span>`
    },
    keyMap: {
      SVG: "SVG_CONTENT",
      FA5: "FA5_NAME",
      TEXT: "TEXT"
    },
    TEXT: {
      month: 'Y'
    },
    SVG: {
      default: `<g><path fill="currentColor" d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/></g>`,
      prev: `<g><path fill="currentColor" d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/></g>`,
      next: `<g><path fill="currentColor" d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/></g>`,
      "left-arrow": `<g><path fill="currentColor" d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/></g>`,
      "right-arrow": `<g><path fill="currentColor" d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/></g>`
    }
  };
  SQDateRangeSlider.defaults({
    iconTemplate: ICON_DATA.defaultTemplate
  });

  class Icon extends BaseModule {
    constructor(slider) {
      super(slider);
    }

    get(name, {
      size = "",
      template = ICON_DATA.defaultTemplate,
      text
    } = {}) {
      const data = ICON_DATA[template] && ICON_DATA[template][name] || text || name;
      console.log('@data', data);
      const icon = ICON_DATA.templates[template].replace(`${ICON_DATA.keyMap[template]}`, data);
      return ICON_DATA.iconTemplate(icon, size);
    }

  }

  SQDateRangeSlider.registerModule("icon", Icon);

  class EventModule extends BaseModule {
    constructor(slider) {
      super(slider);
    }

    onResize() {
      const slider = this;
      slider.rangeSelect.adjustStyles();
      slider.range.adjustGroups();
    }

    attachEvents() {
      this.slider.$on(this.slider.$window, 'resize', this.slider.debounce(this.onResize));
    }

    init() {
      this.attachEvents();
    }

  }

  SQDateRangeSlider.registerModule('evt', EventModule);

  const MomentDateTime$1 = utils.MomentDateTime;
  SQDateRangeSlider.defaults({
    format: "MM/DD/YYYY hh:mm A"
  });

  function DateTimeModule() {
    return {
      DateTime: MomentDateTime$1,
      new: date => {
        return new MomentDateTime$1(date);
      },
      today: () => {
        return new MomentDateTime$1().startOf("day");
      },
      now: () => {
        return new MomentDateTime$1();
      }
    };
  }

  SQDateRangeSlider.registerModule("datetime", DateTimeModule);

  SQDateRangeSlider.defaults({
    currentView: "month",
    viewInterval: {
      year: 1,
      month: 1,
      week: 1,
      day: 1,
      hour: 1,
      minute: 15,
      seconds: 60
    },
    focusInterval: {
      year: 1,
      month: 3,
      week: 4,
      day: 7,
      hour: 4,
      minute: 60,
      seconds: 240
    },
    visibleRange: {
      year: 3,
      month: 3,
      week: 32,
      day: 7,
      hour: 12,
      minutes: 24,
      seconds: 500
    }
  });

  class Range extends BaseModule {
    constructor(slider) {
      super(slider);
      this.classes = this.utils.classes.generate({
        range: {
          prefix: "sq-range",
          column: "column",
          outerContainer: "outer-container",
          container: "container",
          group: "group",
          groupWrapper: "group-wrapper",
          groupHeader: "group-header",
          itemBlock: "item-block",
          itemText: "item-text",
          intervalPoint: "interval-point",
          leftIcon: "left",
          rightIcon: "right"
        }
      });
      this.parentGroupNames = {
        month: "year"
      };
      this.groupNames = {
        year: "none",
        month: "year",
        week: "month",
        day: "month",
        hour: "day",
        minute: "hour",
        seconds: "minute"
      };
      this.childNames = {
        none: "year",
        year: "month",
        month: "week",
        month: "day",
        day: "hour",
        hour: "minute",
        minute: "seconds"
      };
      this.intervalTypes = {
        minute: "minute"
      };
      /** Groups. */

      this.groups = {
        month: "YYYY",
        week: "MMMM",
        day: "MMMM YYYY",
        hour: "D MMM, YYYY",
        minute: "D MMM, YYYY",
        seconds: "mm"
      };
      /** Items. */

      this.itemFormat = {
        year: "YYYY",
        week: "D/M",
        month: "MMM",
        day: "D",
        hour: "hA",
        minute: "hh:mmA",
        seconds: "mm:ss"
      };
      const range = this.getVisibleRange(this.slider.datetime.today().date(), this.slider.config.currentView);
      this._currentPage = {
        from: range.start,
        to: range.end
      };
    }

    _attachEvents() {
      var that = this;
      this.slider.$on(this.$el, "click", `.${this.classes.range.leftIcon}`, function () {
        that.prev();
      });
      this.slider.$on(this.$el, "click", `.${this.classes.range.rightIcon}`, function () {
        that.next();
      });
    }

    getIntervalInSeconds(currentView) {
      switch (currentView) {
        case "seconds":
          return this.slider.config.viewInterval[currentView] * 1000;

        case "minute":
          return this.slider.config.viewInterval[currentView] * 60 * 1000;

        case "hour":
          return this.slider.config.viewInterval[currentView] * 60 * 60 * 1000;

        case "day":
          return this.slider.config.viewInterval[currentView] * 24 * 60 * 60 * 1000;

        case "week":
          return this.slider.config.viewInterval[currentView] * 7 * 24 * 60 * 60 * 1000;

        case "month":
          return this.slider.config.viewInterval[currentView] * 30 * 24 * 60 * 60 * 1000;
      }
    }

    init() {
      const slider = this.slider;
      this.$el = this.slider.$tlcontainer;
      this.$el.addClass(this.classes.range.root);
      this.$el.append(`
    <div class="${this.classes.range.main}">
      <div class="${this.classes.range.column} sq-button ${this.classes.range.leftIcon}">
        ${slider.icon.get("left-arrow", {
      size: "medium"
    })}
      </div>
      <div class="${this.classes.range.column} ${this.classes.range.outerContainer}">
        <div class="${this.classes.range.groupWrapper}">

        </div>
        <div class="${this.classes.range.container}">

        </div>
      </div>
      <div class="${this.classes.range.column} sq-button ${this.classes.range.rightIcon}">
        ${slider.icon.get("right-arrow", {
      size: "medium"
    })}
      </div>
    </div>
    `);
      this.$main = this.$el.find(`.${this.classes.range.main}`);
      this.$outerContainer = this.$el.find(`.${this.classes.range.outerContainer}`);
      this.$container = this.$el.find(`.${this.classes.range.container}`);
      this.$groupWrapper = this.$el.find(`.${this.classes.range.groupWrapper}`);
      this.$left = this.$el.find(`.${this.classes.range.left}`);
      this.$right = this.$el.find(`.${this.classes.range.right}`);

      this._attachEvents();

      this.render();
    }

    set(options = {}) {
      let changeDetected = false;
      Object.keys(options).forEach(option => {
        if (this.slider.config[option] !== options[option]) {
          changeDetected = true;
          this.slider.config[option] = options[option];
        }
      });
      changeDetected && this.render();
    }

    getGroup(interval) {
      return this.groups[interval];
    }

    getItemFormat(interval) {
      return this.itemFormat[interval];
    }

    getDateFromRange(range) {
      var value = range.value;
      var index = Math.floor((value.width + value.left).toFixed(2) / this.currentItemWidth);
      var marginLeft = Math.floor(value.left.toFixed(2) / this.currentItemWidth);
      var remIndex = (value.width + value.left).toFixed(2) % this.currentItemWidth;
      var remLeft = value.left.toFixed(2) % this.currentItemWidth;
      const percentageL = remLeft / this.currentItemWidth * 100;
      const percentageR = remIndex / this.currentItemWidth * 100;

      if (percentageL < 15) {
        remLeft = 0;
      } else if (percentageL > 85) {
        remLeft = 0;
        marginLeft++;
      }

      if (percentageR > 85) {
        remIndex = 0;
        index++;
      } else if (percentageR < 10) {
        remIndex = 0;
      }

      var fromDate = this.currViewRange.items[marginLeft].date;
      var toDate;

      if (Math.floor(remIndex) === 0) {
        if (this.currViewRange.items.length === index) {
          toDate = this.slider.datetime.new(this.currViewRange.items[index - 1].date).add(this.slider.config.viewInterval[this.slider.config.currentView] - 1, this.slider.config.currentView).endOf(this.slider.config.currentView).date();
        } else {
          toDate = this.slider.datetime.new(this.currViewRange.items[index].date).add(-1, this.childNames[this.slider.config.currentView]).endOf(this.childNames[this.slider.config.currentView]).date();
        }
      } else {
        toDate = this.slider.datetime.new(this.currViewRange.items[index].date).date();
      }

      var timeUnit = this.getIntervalInSeconds(this.slider.config.currentView);
      var startAdd = Math.floor(remLeft) / this.currentItemWidth;
      var endAdd = Math.floor(remIndex) / this.currentItemWidth;
      var timeSAddd = timeUnit * startAdd;
      var timeEAddd = timeUnit * endAdd;
      return {
        fromDate: new Date(fromDate.getTime() + timeSAddd),
        toDate: new Date(toDate.getTime() + timeEAddd)
      };
    }

    next() {
      const interval = this.groupNames[this.slider.config.currentView];
      const range = this.getVisibleRange(this._currentPage.from.add(this.slider.config.visibleRange[interval], interval).date(), this.slider.config.currentView);
      this._currentPage.from = range.start;
      this._currentPage.to = range.end;
      this.render();
    }

    prev() {
      const interval = this.groupNames[this.slider.config.currentView];
      const range = this.getVisibleRange(this._currentPage.from.add(this.slider.config.visibleRange[interval] * -1, interval).date(), this.slider.config.currentView);
      this._currentPage.from = range.start;
      this._currentPage.to = range.end;
      this.render();
    }

    render() {
      this.currViewRange = this.getRange(this._currentPage.from, this.slider.config.currentView);
      const htmlGroup = `
    <div class="${this.classes.range.groupWrapper}">
      ${Object.keys(this.currViewRange.groups).map(groupKey => {
      return this.createGroupWrapper(groupKey, this.currViewRange[groupKey]);
    }).join("")}
    </div>`;
      const htmlContent = `<div class="${this.classes.range.container} ${this.slider.config.currentView}">
      ${this.currViewRange.items.map(item => {
      return this.createItem(item);
    }).join("")}
    </div>`;
      this.$groupWrapper.html(htmlGroup);
      this.$container.html(htmlContent);
      this.adjustGroups();
      this.events.emit("onRender", this, {
        ctx: this,
        el: this.$outerContainer
      });
    }

    getItemWidth() {
      var width = this.$(this.$outerContainer.find(`.${this.classes.range.itemBlock}`)[0]).width();
      return width;
    }

    adjustGroups() {
      var width = this.getItemWidth();
      var accumulatedWidth = 0;
      Object.keys(this.currViewRange.groups).forEach((groupKey, idx) => {
        var totalWidth = this.currViewRange.groups[groupKey].totalDays * width;
        this.$(this.$outerContainer.find(`.${this.classes.range.group}`)[idx]).css({
          left: accumulatedWidth,
          width: totalWidth
        });
        accumulatedWidth += totalWidth;
      });
      this.currentItemWidth = width;
    }

    createGroupWrapper(groupKey, config) {
      return `<div class="${this.classes.range.group}">
      <div class="${this.classes.range.groupHeader}">${groupKey}</div>
    </div>`;
    }

    createItem(item) {
      return `<div class="${this.classes.range.itemBlock} ${item.intervalPoint ? `${this.classes.range.intervalPoint}` : ""}">
      <span class="${this.classes.range.itemText}">
        ${item.displayDate}
      </span>
    </div>`;
    }

    getVisibleRange(from, interval) {
      var start, end;

      switch (this.groupNames[interval]) {
        default:
          start = this.slider.datetime.new(from).startOf(this.groupNames[interval]);
          end = this.slider.datetime.new(start).add(this.slider.config.visibleRange[this.groupNames[interval]] - 1, this.groupNames[interval]).endOf(this.groupNames[interval]);
      }

      return {
        start,
        end
      };
    }

    getRange(from, interval) {
      const visbleRange = this.getVisibleRange(from, interval);
      var start = visbleRange.start;
      var end = visbleRange.end;
      var output = [];
      let counter = -1;
      const groups = {};

      while (start.date() < end.date()) {
        const fnCounter = this.intervalTypes[interval];

        if (fnCounter && start[fnCounter]) {
          counter = start[this.intervalTypes[interval]]();
        } else {
          counter++;
        }

        const group = start.format(this.getGroup(interval));

        if (!groups[group]) {
          groups[group] = {
            totalDays: 1
          };
        } else {
          groups[group].totalDays++;
        }

        output.push({
          date: start.date(),
          group: group,
          intervalPoint: this.slider.config.focusInterval[interval] === 1 || this.slider.config.focusInterval[interval] !== 1 && (counter + 1) % this.slider.config.focusInterval[interval] === 1,
          displayDate: start.format(this.getItemFormat(interval))
        });
        start.add(this.slider.config.viewInterval[interval], interval);
      }

      return {
        groups,
        items: output
      };
    }

  }

  SQDateRangeSlider.registerModule("range", Range);

  SQDateRangeSlider.defaults({});
  SQDateRangeSlider.ACTIONS = {
    prev: {
      icon: "left-arrow",
      FA5_NAME: "left-arrow",
      text: "Prev",
      execute: function () {
        this.slider.range.prev();
      }
    },
    next: {
      icon: "right-arrow",
      FA5_NAME: "right-arrow",
      text: "Next",
      execute: function () {
        this.slider.range.next();
      }
    },
    year: {
      icon: "text",
      template: "TEXT",
      FA5_NAME: "text",
      text: "Y",
      execute: function () {
        var slider = this.slider;
        slider.switchView("year");
      }
    },
    month: {
      icon: "text",
      template: "TEXT",
      FA5_NAME: "text",
      text: "M",
      execute: function () {
        var slider = this.slider;
        slider.switchView("month");
      }
    },
    week: {
      icon: "text",
      template: "TEXT",
      text: "W",
      execute: function () {
        var slider = this.slider;
        slider.switchView("week");
      }
    },
    day: {
      icon: "text",
      template: "TEXT",
      text: "D",
      execute: function () {
        var slider = this.slider;
        slider.switchView("day");
      }
    },
    hour: {
      icon: "text",
      template: "TEXT",
      text: "h",
      execute: function () {
        var slider = this.slider;
        slider.switchView("hour");
      }
    },
    minute: {
      icon: "text",
      template: "TEXT",
      text: "m",
      execute: function () {
        var slider = this.slider;
        slider.switchView("minute");
      }
    },
    zoomIn: {
      icon: "text",
      template: "TEXT",
      text: "+",
      execute: function () {
        var slider = this.slider;
        slider.zoomIn();
      }
    },
    zoomOut: {
      icon: "text",
      template: "TEXT",
      text: "-",
      execute: function () {
        var slider = this.slider;
        slider.zoomOut();
      }
    }
  };

  SQDateRangeSlider.createAction = function (name, options) {
    SQDateRangeSlider.ACTIONS[name] = options;
  };

  class Actions extends BaseModule {
    constructor(slider) {
      super(slider);
    }

    init() {}

    get(name) {
      return SQDateRangeSlider.ACTIONS[name];
    }

    exec(action, args) {
      return SQDateRangeSlider.ACTIONS[action].execute.call(this, args);
    }

  }

  SQDateRangeSlider.registerModule("actions", Actions);

  class Draggable extends Component {
    constructor(el, config) {
      super(el, config);
      this.$el = this.$(el);
      this.state = {};
      this.classes = this.utils.classes.generate({
        draggable: {
          prefix: "sq-draggable",
          dragging: "dragging"
        }
      });
      this.init();
    }

    init() {
      this.$el.addClass(this.classes.draggable.root);
      this.$el.css("cursor", "move");
      this.attachEvents();
    }

    mouseDown(e, el) {
      if (this.$(el).hasClass(this.classes.draggable.root)) {
        this._mouseDown = true;
        var dr = this.$(el).addClass(this.classes.draggable.dragging);
        this.dragging = dr;
        var height = dr.outerHeight();
        var width = dr.outerWidth();
        var parentOffset = this.dom.offset(this.config.parent);
        var max_left = parentOffset.left + this.config.parent.width() - dr.width();
        var max_top = parentOffset.top + this.config.parent.height() - dr.height();
        var min_left = parentOffset.left;
        var min_top = parentOffset.top;
        var drOffset = this.dom.offset(dr);
        var ypos = e.pageY - height - drOffset.top;
        var xpos = e.pageX - width - drOffset.left;
        this.startPoint = {
          height,
          width,
          xpos,
          ypos,
          max_left,
          max_top,
          min_left,
          min_top
        };
      }
    }

    mouseMove(e, el) {
      e.preventDefault();
      e.stopPropagation(); // var e = args.originalEvent;

      if (this._mouseDown) {
        if (this.dragging) {
          var dr = this.dragging;
          var ileft = e.pageX - this.startPoint.xpos - this.startPoint.width;

          if (this.config.snapToElement) {
            ileft = Math.floor(utils.number.toNum(ileft / this.config.grid[0])) * this.config.grid[0] + this.startPoint.min_left;
          }

          if (dr.hasClass(this.classes.draggable.dragging)) {
            if (ileft <= this.startPoint.min_left) {
              ileft = this.startPoint.min_left;
            }

            if (ileft >= this.startPoint.max_left) {
              ileft = this.startPoint.max_left;
            }

            dr.css({
              left: ileft
            });
            console.log("@@@@", ileft, this.config.grid[0], ileft - this.startPoint.min_left / this.config.grid[0]);
          }
        }

        this.events.emit("onChange");
      }
    }

    mouseUp(e, el) {
      e.preventDefault();
      e.stopPropagation();
      this.clear();
    }

    clear() {
      if (this._mouseDown) {
        this._mouseDown = false;
        this.dragging.removeClass(this.classes.draggable.dragging);
        this.dragging = null;
      }
    }

    attachEvents() {
      this.$on(this.$el, "mousedown", this.mouseDown);
      this.$on(this.$el, "mouseup", this.mouseUp);
      this.$on(this.config.parent, "mouseup", this.mouseUp);
      this.$on(this.$el, "mousemove", this.mouseMove);
      this.$on(this.config.parent, "mousemove", this.mouseMove);
    }

    adjustStyles() {
      var itemW = this.config.grid[0];
      this.$el.css({
        height: this.config.parent.outerHeight(),
        left: this.config.parent[0].offsetLeft,
        top: this.config.parent[0].offsetTop,
        width: itemW * 3,
        position: "absolute"
      });
    }

    render() {
      this.adjustStyles();
    }

  }

  class Resizable extends Component {
    constructor(el, config) {
      super(el, config);
      this.$el = this.$(el);
      this.classes = this.utils.classes.generate({
        resizable: {
          prefix: "sq-resizable",
          resizing: "resizing",
          leftHandle: "left-handle",
          rightHandle: "right-handle"
        }
      });
      this.init();
    }

    value() {
      var offset = this.dom.offset(this.$el);
      var pOffset = this.dom.offset(this.config.parent);
      return {
        width: this.$el.width(),
        left: offset.left - pOffset.left
      };
    }

    adjustStyles() {}

    init() {
      this.$el.addClass(this.classes.resizable.root);
      const html = `
      <div class="${this.classes.resizable.leftHandle}">
      </div>
      <div class="${this.classes.resizable.rightHandle}">
      </div>
    `;
      this.$el.html(html);
      this.attachEvents();
    }

    mouseDown(e, el) {
      e.preventDefault();
      e.stopPropagation();

      if (this.$(el).parent().hasClass(this.classes.resizable.root)) {
        var isLeft = this.$(el).hasClass(this.classes.resizable.leftHandle);
        this._mouseDown = true;
        var dr = this.$(el).parent().addClass("resizing");
        this.resizing = dr;
        var dr = this.resizing;
        var width = dr.outerWidth();
        var parentOffset = this.dom.offset(this.config.parent);
        var max_left = parentOffset.left + this.config.parent.width() - dr.width();
        var min_left = parentOffset.left;
        var drOffset = this.dom.offset(dr);
        var xpos = e.pageX - drOffset.left;
        var oPageX = e.pageX;
        var parentWidth = this.config.parent.width();
        this.startPoint = {
          startLeft: drOffset.left,
          maxRight: drOffset.left + width,
          parentWidth,
          isLeft,
          oPageX,
          width,
          xpos,
          max_left,
          min_left
        };
      }
    }

    mouseMove(e, el) {
      e.preventDefault();
      e.stopPropagation(); // var e = args.originalEvent;

      if (this._mouseDown) {
        if (this.resizing) {
          var dr = this.resizing;
          var diff, newWidth, newLeft;
          var snapElW = this.config.grid[0];

          if (dr.hasClass("resizing")) {
            if (this.startPoint.isLeft) {
              diff = this.startPoint.oPageX - e.pageX;

              if (this.config.snapToElement) {
                if (diff >= 0) {
                  diff = Math.ceil(diff / snapElW) * snapElW;
                } else {
                  diff = Math.ceil(diff / snapElW) * snapElW;
                }
              }

              newWidth = this.startPoint.width + diff;
              newLeft = this.startPoint.startLeft + diff * -1; // console.log(this.startPoint.width, newWidth, this.startPoint.startLeft, newLeft);

              if (newWidth < snapElW) {
                newWidth = snapElW;
              }

              if (newWidth <= this.startPoint.parentWidth - (this.startPoint.startLeft - this.startPoint.min_left) && newLeft >= this.startPoint.min_left) {
                dr.css({
                  width: newWidth,
                  left: newLeft
                });
              }
            } else {
              diff = e.pageX - this.startPoint.oPageX;

              if (this.config.snapToElement) {
                diff = Math.ceil(diff / snapElW) * snapElW;
              }

              newWidth = this.startPoint.width + diff; // newWidth = Math.floor(newWidth / snapElW) * snapElW;

              if (newWidth < snapElW) {
                newWidth = snapElW;
              } // console.log(this.startPoint.parentWidth,newWidth , newWidth <= (this.startPoint.parentWidth - (this.startPoint.startLeft - this.startPoint.min_left)))


              if (newWidth - 2 <= this.startPoint.parentWidth - (this.startPoint.startLeft - this.startPoint.min_left)) {
                dr.css({
                  width: newWidth
                });
              }
            }

            this.events.emit("onChange", {
              value: this.value()
            });
          }
        }
      }

      return false;
    }

    mouseUp(e, el) {
      e.preventDefault();
      e.stopPropagation();
      this.clear();
    }

    clear() {
      if (this._mouseDown) {
        this._mouseDown = false;

        if (this.resizing) {
          this.resizing.removeClass("resizing");
          this.resizing = null;
        }
      }
    }

    attachEvents() {
      this.$on(this.$el, "mousedown", `.${this.classes.resizable.leftHandle}`, this.mouseDown);
      this.$on(this.$el, "mousedown", `.${this.classes.resizable.rightHandle}`, this.mouseDown);
      this.$on(this.$el, "mouseup", `.${this.classes.resizable.leftHandle}`, this.mouseUp);
      this.$on(this.$el, "mouseup", `.${this.classes.resizable.rightHandle}`, this.mouseUp);
      this.$on(this.$el, "mouseup", this.mouseUp);
      this.$on(this.config.parent, "mouseup", this.mouseUp);
      this.$on(this.$el, "mousemove", this.mouseMove);
      this.$on(this.config.parent, "mousemove", this.mouseMove);
    }

    render() {}

  }

  SQDateRangeSlider.defaults({
    snapToGrid: false
  });

  class RangeSelect extends BaseModule {
    constructor(slider) {
      super(slider);
      this.classes = this.utils.classes.generate({
        rangeSelect: {
          prefix: "sq-range-select",
          outerContainer: "outer-container",
          container: "container",
          handleLeft: "h-left",
          handleRight: "h-right"
        }
      });
    }

    clear() {
      this.draggable.clear();
      this.resizable.clear();
    }

    onKeySet(key, value) {
      if (key === "grid") {
        this.draggable.setConfig(key, value);
        this.resizable.setConfig(key, value);
      }
    }

    attachEvents() {
      this.draggable = new Draggable(this.$el, {
        parent: this.$parent,
        grid: this.grid,
        snapToElement: this.slider.config.snapToGrid,
        axis: "x"
      });
      this.draggable.events.on("onChange", args => {
        this.slider._internalEvents.emit("onChange", this.value());
      }, this);
      this.resizable = new Resizable(this.$el, {
        parent: this.$parent,
        grid: this.grid,
        snapToElement: this.slider.config.snapToGrid
      }, this);
      this.resizable.events.on("onChange", args => {
        this.slider._internalEvents.emit("onChange", this.value());
      });
      this.slider.$on(this.slider.$ownerDoc, "mouseup", () => {
        this.clear();
      });
    }

    value() {
      return {
        value: this.resizable.value()
      };
    }

    reset() {}

    adjustStyles() {
      var width = this.slider.range.getItemWidth();
      this.draggable.setConfig("grid", [width, width]);
      this.resizable.setConfig("grid", [width, width]);
      this.draggable.adjustStyles();
      this.resizable.adjustStyles();
    }

    onRender() {
      this.adjustStyles();
      this.events.emit("onRender", this.value());
    }

    init() {
      this.$el = this.slider.$rangeSelect;
      this.grid = [10, 10];
      this.$parent = this.slider.range.$container;
      this.$el.addClass(this.classes.rangeSelect.root);
      this.$container = this.$el.find(`.${this.classes.rangeSelect.container}`);
      this.attachEvents();
      this.render();
    }

    render() {
      this.draggable.render(); // const html = `   `;

      this.onRender();
    }

  }

  SQDateRangeSlider.registerModule("rangeSelect", RangeSelect);

  SQDateRangeSlider.defaults({
    //default config goes here
    levels: ["day", "hour", "minute"]
  });

  SQDateRangeSlider.defaults({
    buttonTemplate: "normal" // normal/embeded/raised

  });

  class Button extends BaseModule {
    constructor(slider) {
      super(slider);
    }

    init() {}

    generate(btn) {
      const icon = this.slider.icon.get(btn.icon, { ...btn
      });
      console.log(btn);
      return `<button type="button" data-action="${btn.action}" class="sq-button sq-button--filled">${icon}
      <span class="sq-button__text">${btn.text}</span>
    </button>`;
    }

  }

  SQDateRangeSlider.registerModule("button", Button);

  SQDateRangeSlider.defaults({
    buttonTemplate: "normal" // normal/embeded/raised

  });
  SQDateRangeSlider.groups = {
    basic: {
      buttons: ["prev", "next", "expandLeft", "expandRight"]
    },
    selection: {
      buttons: ["bold", "italic", "subscript", "superscript"]
    },
    extend: {
      buttons: ["insertImage"]
    }
  };

  class ButtonGroup extends BaseModule {
    constructor(slider) {
      super(slider);
    }

    init() {}

    getButtonsList() {
      return [{
        group: "basic",
        buttons: ["prev", "next"]
      }, {
        group: "switch",
        buttons: ["year", "month", "week", "day", "hour", "minute"]
      }, {
        group: "zoom",
        buttons: ["zoomOut", "zoomIn"]
      }];
    }

    getSeparator() {
      return `<div class="sq-separator"></div>`;
    }

    generate(groupList) {
      return groupList.map(group => {
        const output = group.buttons.map(btn => {
          var actionButton = this.slider.actions.get(btn);
          actionButton.action = btn;
          return this.slider.button.generate(actionButton);
        }).join("");
        return `<div class="sq-button-group">${output}</div>`;
      }).join(this.getSeparator());
    }

  }

  SQDateRangeSlider.registerModule("buttonGroup", ButtonGroup);

  SQDateRangeSlider.defaults({
    showInline: false
  });

  class Toolbar extends BaseModule {
    constructor(slider) {
      super(slider);
    }

    init() {
      this.loadDom();
      this.addClasses();
      this.buttonGroup = this.slider.buttonGroup;
      this.attachEvents();
      this.$el.html(this.buttonGroup.generate(this.buttonGroup.getButtonsList()));
    }

    attachEvents() {
      this.slider.$on(this.slider.$toolbar, 'click', '.sq-button', this.runAction);
    }

    runAction(e, btn) {
      this.actions.exec(btn.getAttribute('data-action'));
    }

    loadDom() {
      this.$el = this.slider.$toolbar;
    }

    addClasses() {
      this.$el.addClass('sq-toolbar');
    }

  }

  SQDateRangeSlider.registerModule('toolbar', Toolbar);

  SQDateRangeSlider.defaults({
    format: "MM/DD/YYYY",
    rounded: true
  });

  class Bootstrap extends Component {
    constructor(el, config) {
      config = Object.assign({}, Object.assign({}, SQDateRangeSlider.DEFAULTS, typeof config === "object" && config));
      super(el, config);
      this.$outerEl = this.$el;
      this.$outerEl.data("instance.daterange", this);
      this.ownerDoc = el.ownerDocument;
      this.ownerWin = "defaultView" in this.ownerDoc ? this.ownerDoc.defaultView : this.ownerDoc.parentWindow;
      this.classes = this.utils.classes.generate({
        toolbar: {
          prefix: "sq-toolbar"
        },
        slider: {
          prefix: "sq-daterange",
          rounded: "m:rounded",
          container: "container",
          tlContainer: "tl-container",
          switchView: "switch-view",
          rangeSelect: "range-select",
          drContainer: "dr-container",
          drInputContainer: "dr-container",
          topActions: "top-actions",
          zoomLevel: "zoom-level",
          drFrom: "dr-from",
          drTo: "dr-to"
        }
      });
      this.init();
    }

    onViewChange(args) {
      this.switchView(args.value);
    }

    switchView(value) {
      this.range.set({
        currentView: value
      });
      this.rangeSelect.adjustStyles();
    }

    applyClasses() {}

    setDate(range) {
      const output = this.range.getDateFromRange(range);
      this.currentValue = output;
      this.$from[0].value = this.datetime.new(output.fromDate).format(this.config.format);
      this.$to[0].value = this.datetime.new(output.toDate).format(this.config.format);
    }

    onChange(args) {
      this.setDate(args);
    }

    onRender(args) {
      this.setDate(this.rangeSelect.value());
    }

    attachEvents() {
      this._internalEvents.on("onViewChange", this.onViewChange, this);

      this._internalEvents.on("onChange", this.onChange, this);

      this.events.on("onRender", this.onRender, this);
    }

    init() {
      this.initDefault();
      this.loadDom();
      this.attachEvents();
    }

    delayInit() {
      this.ownerDoc = this.$el.get(0).ownerDocument;
      this.window = this.ownerDoc.defaultView ? this.ownerDoc.defaultView : this.ownerDoc.parentWindow;
      this.$ownerDoc = this.$(this.ownerDoc);
      this.$window = this.$(this.window);
      this.load(SQDateRangeSlider.MODULES);
      this.load(SQDateRangeSlider.PLUGINS);
      this.events.emit("onRender", this);
    }

    load(module_list) {
      for (const m_name in module_list) {
        if (Object.prototype.hasOwnProperty.call(module_list, m_name)) {
          if (this[m_name]) {
            continue;
          }

          this[m_name] = new module_list[m_name](this);

          if (this[m_name].init) {
            this[m_name].init();
          }
        }
      }
    }

    initDefault() {
      this.$el.html(`<div class="${this.classes.slider.root} ${this.config.rounded ? this.classes.slider.rounded : ""}">
          <div class="${this.classes.slider.container}">
            <div class="${this.classes.toolbar.root}">
            </div>
            <div class="${this.classes.slider.topActions}">
              <div class="${this.classes.slider.switchView}">
              
              </div>
              <div class="${this.classes.slider.zoomLevel}">
              
              </div>
            </div>
          <div class="${this.classes.slider.tlContainer}">
            <div class="${this.classes.slider.rangeSelect}">
            
            </div>
          </div>
          <div class="sq-text-center ${this.classes.slider.drContainer}">
            <div class="${this.classes.slider.drInputContainer}">
            <label class="sq-input-label">From:</label>
            <input class="sq-input-text ${this.classes.slider.drFrom}"/>
            <label class="sq-input-label">To:</label>
            <input class="sq-input-text ${this.classes.slider.drTo}"/>
          </div>
        </div>`);
      this.applyClasses();
      setTimeout(this.delayInit.bind(this), 0);
    }

    loadDom() {
      this.$container = this.$el.find(`.${this.classes.slider.container}`);
      this.$toolbar = this.$el.find(`.${this.classes.toolbar.root}`);
      this.$tlcontainer = this.$el.find(`.${this.classes.slider.tlContainer}`);
      this.$switchView = this.$el.find(`.${this.classes.slider.switchView}`);
      this.$rangeSelect = this.$el.find(`.${this.classes.slider.rangeSelect}`);
      this.$zoomLevel = this.$el.find(`.${this.classes.slider.zoomLevel}`);
      this.$from = this.$el.find(`.${this.classes.slider.drFrom}`);
      this.$to = this.$el.find(`.${this.classes.slider.drTo}`);
    }

  }

  SQDateRangeSlider.Bootstrap = Bootstrap;

  return SQDateRangeSlider;

}));
//# sourceMappingURL=sq-daterange-slider.js.map
