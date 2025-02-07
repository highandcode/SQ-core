import animateScrollTo from 'animated-scroll-to';
import { QueryString } from './query-string';
import { events } from './app-events';
let history;
let urlMapping = {};
let customHandlers = {};

export const setUrlMapping = (newMap) => {
  urlMapping = {
    ...urlMapping,
    ...newMap,
  };
};

export const setHistory = (newHistory) => {
  history = newHistory;
};

export const setCustomHandlers = (newHandlers) => {
  customHandlers = {
    ...customHandlers,
    ...newHandlers,
  };
};

export const redirectTo = (screen, params = {}, { target = '', ...options } = {}) => {
  if (!screen) {
    return;
  }
  events.emit('beforeRedirect', screen, params, { target, ...options });
  if (params.handler === 'custom') {
    customHandlers[params.handlerType] && customHandlers[params.handlerType](screen, params, { target, ...options });
  } else {
    const url = urlMapping[screen];
    const query = new QueryString(params).toString();
    let matchedRegex;
    Object.keys(urlMapping).forEach((key) => {
      if (typeof urlMapping[key] === 'object') {
        if (urlMapping[key].type === 'regex') {
          if (screen.match(new RegExp(key, 'g'))) {
            matchedRegex = key;
          }
        }
      }
    });
    if (url) {
      if (target === '_top') {
        window.top.location.href = url + query;
      } else if (target === '_blank') {
        window.open(url + query);
      } else {
        animateScrollTo(0);
        setTimeout(() => {
          history.push(url + query);
        });
      }
    } else if (matchedRegex) {
      const processEdUrl = screen.replace(new RegExp(matchedRegex, 'g'), urlMapping[matchedRegex].target);
      if (target === '_top') {
        window.top.location.href = processEdUrl + query;
      } else if (target === '_blank') {
        window.open(processEdUrl + query);
      } else {
        setTimeout(() => {
          animateScrollTo(0);
          history.push(processEdUrl + query);
        });
      }
    } else {
      console.log('okkk');
      if (target === '_top') {
        window.top.location.href = screen + query;
      } else if (target === '_blank') {
        window.open(screen + query);
      } else {
        window.location.href = screen + query;
      }
    }
  }
  setTimeout(() => {
    events.emit('afterRedirect', screen, params, { target, ...options });
  }, 120);
};
